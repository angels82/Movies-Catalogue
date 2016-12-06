(function () {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_BykT85ZQx";
    const appSecret = "ca246b15f1a648e19f05adffcefc0401";

    let authenticationService = new Authentication(appKey, appSecret);
    let requester = new Requester(baseUrl + 'appdata/' + appKey);
    let renderer = new Renderer(authenticationService);

    let homeView = new HomeView(renderer);
    let loginView = new LoginView(renderer);
    let registerView = new RegisterView(renderer);
    let listMoviesView = new ListMoviesView(renderer);
    let createMovieView = new CreateMovieView(renderer);
    let editMovieView = new EditMovieView(renderer);
    let movieDetailsView = new MovieDetailsView(renderer);
    let addCommentView = new AddCommentView(renderer);
    let editCommentView = new EditCommentView(renderer);
    let deleteCommentView = new DeleteCommentView(renderer);

    let userModel = new UserModel(requester, authenticationService);
    let movieModel = new MovieModel(requester, authenticationService);
    let commentModel = new CommentModel(requester, authenticationService);

    let movieController =
        new MovieController(movieModel, commentModel, homeView, listMoviesView, createMovieView, editMovieView, movieDetailsView, addCommentView, editCommentView, deleteCommentView, renderer);
    let userController = new UserController(userModel, movieController, loginView, registerView, listMoviesView, homeView, renderer);

    //sessionStorage.clear();

    const notLoggedUserLinks = [
        $('<a href="#" id="linkHome">Home</a>')
            .click(homeView.renderView.bind(homeView)),

        $('<a href="#" id="linkLogin">Login</a>')
            .click(loginView.renderView.bind(loginView,userController.logInUser.bind(userController))),

        $('<a href="#" id="linkRegister">Register</a>')
            .click(registerView.renderView.bind(registerView,userController.registerUser.bind(userController)))
    ];

    const loggedUserLinks = [
        $('<a href="#" id="linkListMovies">List Movies</a>')
            .click(movieController.listMovies.bind(movieController)).hide(),
        $('<a href="#" id="linkListMyMovies">My Movies</a>')
            .click(movieController.listMyMovies.bind(movieController)).hide(),
        $('<a href="#" id="linkCreateMovie">Create Movie</a>')
            .click(createMovieView.renderView.bind(createMovieView,movieController.createMovie.bind(movieController))).hide(),
        $('<a href="#" id="linkLogout">Logout</a>').click(userController.logOutUser.bind(userController)).hide()
    ];
    renderer.setLinks(notLoggedUserLinks, loggedUserLinks);
    $('#menu').append(notLoggedUserLinks);
    $('#menu').append(loggedUserLinks);

    homeView.renderView();


}());