function startApp() {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_BykT85ZQx";
    const kinveyAppSecret = "ca246b15f1a648e19f05adffcefc0401";

    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(kinveyAppKey + ':' + kinveyAppSecret)
    };

    sessionStorage.clear();

    showHideMenuLinks();
    showView('viewHome');

    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkListMovies').click(listMovies);
    $('#linkListMyMovies').click(listMyMovies);
    $('#linkCreateMovie').click(showCreateMovieView);
    $('#linkLogout').click(logoutUser);

    $('#formLogin').submit(loginUser);
    $('#formRegister').submit(registerUser);
    $('#formCreateMovie').submit(createMovie);
    $('#formEditMovie').submit(editMovie);

    $('#infoBox, #errorBox').click(function() {
        $(this).fadeOut()
    });

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').hide()
    });


    function showHideMenuLinks() {
        $('#linkHome').show();

        if (sessionStorage.getItem('authToken')) {
            $('#linkLogin').hide();
            $('#linkRegister').hide();
            $('#linkListMovies').show();
            $('#linkListMyMovies').show();
            $('#linkCreateMovie').show();
            $('#linkLogout').show();
        } else {
            $('#linkLogin').show();
            $('#linkRegister').show();
            $('#linkListMovies').hide();
            $('#linkListMyMovies').hide();
            $('#linkCreateMovie').hide();
            $('#linkLogout').hide();
        }
    }

    function showView(viewName) {
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function listMovies() {
        $('#movies').empty();
        showView('viewMovies');

        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/movies',
            headers: getKinveyUserAuthHeaders(),
            success: loadMoviesSuccess,
            error: handleAjaxError
        });
        
        function loadMoviesSuccess(movies) {
            showInfo('Movies loaded.');

            if (movies.length == 0) {
                $('#movies').text('No movies in the library.');
            } else {
                let moviesTable = $('<table>')
                    .append($('<tr>')
                        .append('<th>Title</th><th>Director</th><th>Year</th><th>Description</th><th>Actions</th>'));

                for (let movie of movies) {
                    appendMovieRow(movie, moviesTable);
                }

                $('#movies').append(moviesTable);
            }
        }
    }

    function listMyMovies() {
        $('#myMovies').empty();
        showView('viewMyMovies');

        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/movies',
            headers: getKinveyUserAuthHeaders(),
            success: loadMoviesSuccess,
            error: handleAjaxError
        });

        function loadMoviesSuccess(movies) {
            showInfo('Movies loaded.');

            if (movies.length == 0) {
                $('#movies').text('No movies in the library.');
            } else {
                let moviesTable = $('<table>')
                    .append($('<tr>')
                        .append('<th>Title</th><th>Director</th><th>Year</th><th>Description</th><th>Actions</th>'));

                for (let movie of movies) {
                    if (movie._acl.creator == sessionStorage.getItem('userId'))
                        appendMovieRow(movie, moviesTable);
                }

                $('#myMovies').append(moviesTable);
            }
        }
    }

    function appendMovieRow(movie, moviesTable) {
        let links= [];

        if(movie._acl.creator == sessionStorage['userId']) {
            let deleteLink = $('<button>Delete</button>').click(function() { deleteMovie(movie) });
            let editLink = $('<button>Edit</button>').click(function() { loadMovieForEdit(movie) });

            links = [deleteLink, ' ', editLink];
        }

        moviesTable.append($('<tr>').append(
            $('<td>').text(movie.title),
            $('<td>').text(movie.director),
            $('<td>').text(movie.year),
            $('<td>').text(movie.description),
            $('<td>').append(links)
        ));
    }

    function showCreateMovieView() {
        $('#formCreateMovie').trigger('reset');
        showView('viewCreateMovie');
    }

    function loginUser(event) {
        event.preventDefault();

        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=password]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/login',
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });
        
        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listMovies();
            showInfo('Login successful.');
        }
    }

    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text('');
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.');
    }

    function registerUser(event) {
        event.preventDefault();

        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=password]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/',
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        });

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listMovies();
            showInfo('User registration successful.');
        }
        
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);

        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);

        let username = userInfo.username;
        $('#loggedInUser').text("Welcome, " + username + "!");
    }

    function createMovie(event) {
        event.preventDefault();

        let movieData = {
            title: $('#formCreateMovie input[name=title]').val(),
            director: $('#formCreateMovie input[name=director]').val(),
            year: $('#formCreateMovie input[name=year]').val(),
            description: $('#formCreateMovie textarea[name=descr]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/movies',
            headers: getKinveyUserAuthHeaders(),
            data: movieData,
            success: createMovieSuccess,
            error: handleAjaxError
        });

        function createMovieSuccess() {
            listMovies();
            showInfo('Movie created.');
        }
    }

    function editMovie(event) {
        event.preventDefault();

        let movieData = {
            title: $('#formEditMovie input[name=title]').val(),
            director: $('#formEditMovie input[name=director]').val(),
            year: $('#formEditMovie input[name=year]').val(),
            description: $('#formEditMovie textarea[name=descr]').val()
        };

        $.ajax({
            method: "PUT",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/movies/' + $('#formEditMovie input[name=id]').val(),
            headers: getKinveyUserAuthHeaders(),
            data: movieData,
            success: editMoviesSuccess,
            error: handleAjaxError
        });

        function editMoviesSuccess(response) {
            if($('#viewMovies').css('display') != 'none')
                listMovies();
            else
                listMyMovies();

            showInfo('Movie edited.');
        }
    }

    function loadMovieForEdit(movie) {
        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/movies/' + movie._id,
            headers: getKinveyUserAuthHeaders(),
            success: loadMovieForEditSuccess,
            error: handleAjaxError
        });

        function loadMovieForEditSuccess(movie) {
            $('#formEditMovie input[name=id]').val(movie._id);
            $('#formEditMovie input[name=title]').val(movie.title);
            $('#formEditMovie input[name=director]').val(movie.director);
            $('#formEditMovie input[name=year]').val(movie.year);
            $('#formEditMovie textarea[name=descr]').val(movie.description);

            showView('viewEditMovie');
        }
    }

    function deleteMovie(movie) {
        $.ajax({
            method: "DELETE",
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/movies/' + movie._id,
            headers: getKinveyUserAuthHeaders(),
            success: deleteMovieSuccess,
            error: handleAjaxError
        });

        function deleteMovieSuccess() {
            if($('#viewMovies').css('display') != 'none')
                listMovies();
            else
                listMyMovies();
            showInfo('Movie deleted.');
        }
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
        };
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();

        setTimeout(() => $('#infoBox').fadeOut(), 3000);
    }

    function handleAjaxError(response) {
        let errorMessage = JSON.stringify(response);
        if(response.readyState === 0)
            errorMessage = "Cannot connect due to network error.";
        if(response.responseJSON && response.responseJSON.description)
            errorMessage = response.responseJSON.description;
        showError(errorMessage);


        function showError(errorMsg) {
            $('#errorBox').text('Error: ' + errorMsg);
            $('#errorBox').show();
        }
    }
}