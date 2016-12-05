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

    showHome() {
        this.homeView.renderView();
    }

    listMovies() {
        let movies = this.getMovies();
        this.listMoviesView.renderView(movies);
    }

    listMyMovies() {
        let userId = sessionStorage.getItem('userId');
        let myMovies = this.getMyMovies(userId);
        this.listMoviesView(myMovies);
    }

    createMovie() {
        this.createMovieView.renderView();
    }

    editMovie(movieId) {
        let movie = this.getMovie(movieId);
        this.editMovieView.renderView(movie);
    }

    showMovieDetails(movieId) {
        let movie = this.getMovie(movieId);
        let comments = this.commentController.getComments(movieId);
        this.movieDetailsView.renderView(movie, comments);
    }

    getMovie(movieId) {

    }

    getMovies() {

    }

    getMyMovies(userId) {
        // Calls this.getMovies and filters by userId
    }

    postMovie() {

    }

    putMovie(movieId) {

    }

    deleteMovie(movieId) {

    }
}