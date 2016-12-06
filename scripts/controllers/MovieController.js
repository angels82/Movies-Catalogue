// Receives user data from movie views
// and sends it to the moviesModel
// then handles the result from the request

class MovieController {
    constructor(movieModel, commentController, homeView, listMoviesView, createMovieView, editMovieView, movieDetailsView, renderer) {
        this.movieModel = movieModel;
        this.commentController = commentController;
        this.homeView = homeView;
        this.listMoviesView = listMoviesView;
        this.createMovieView = createMovieView;
        this.editMovieView = editMovieView;
        this.movieDetailsView = movieDetailsView;
        this.renderer = renderer;
    }

    getMovie(movieId) {
        let _self = this;

        this.movieModel.getMovie(movieId)
            .then(function (movie) {
                _self.listMoviesView.renderView(movies);
            })
            .catch(function (errorMessage) {
                _self.renderer.handleError(errorMessage);
            });
    }

    listMovies() {
        let _self = this;

        this.movieModel.getMovies()
            .then(function (movies) {
                _self.listMoviesView.renderView(movies,'Movies');
                _self.renderer.renderInfo('Movies loaded.');
            })
            .catch(function (errorMessage) {
                _self.renderer.handleError(errorMessage);
            });
    }

    listMyMovies() {
        let _self = this;

        this.movieModel.getMovies()
            .then(function (movies) {
                console.log(movies)
                let myMovies = movies.filter((movie) => movie._acl.creator == sessionStorage.getItem('userId'));
                _self.listMoviesView.renderView(myMovies,'My Movies');
                _self.renderer.renderInfo('My Movies loaded.');
            })
            .catch(function (errorMessage) {
                _self.renderer.handleError(errorMessage);
            });
    }

    // listMyMovies() {
    //     let userId = sessionStorage.getItem('userId');
    //     let myMovies = this.getMyMovies(userId);
    //     this.listMoviesView.renderView(myMovies,'Movies');
    // }

    // createMovie() {
    //     // this.createMovieView.renderView();
    // }

    editMovie(movieId) {
        let movie = this.getMovie(movieId);
        this.editMovieView.renderView(movie);
    }

    showMovieDetails(movieId) {
        let movie = this.getMovie(movieId);
        let comments = this.commentController.getComments(movieId);
        this.movieDetailsView.renderView(movie, comments);
    }



    createMovie() {
        let _self = this;
        let movie = this.createMovieView.submitData();

        this.movieModel.createMovie(movie)
            .then(function () {
                _self.renderer.renderInfo('Movie created.');
                _self.listMoviesView.renderView();
            })
            .catch(function (errorMessage) {
                _self.renderer.handleError(errorMessage);
            });
    }

    putMovie(movieId) {

    }

    deleteMovie(movieId) {

    }
}