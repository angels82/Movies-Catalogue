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

    listMovies() {
        let _self = this;

        this.movieModel.getMovies()
            .then(function (movies) {
                _self.listMoviesView.renderView(movies, _self, 'Movies');
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
                let myMovies = movies.filter((movie) => movie._acl.creator == sessionStorage.getItem('userId'));
                _self.listMoviesView.renderView(myMovies, _self,'My Movies');
                _self.renderer.renderInfo('My Movies loaded.');
            })
            .catch(function (errorMessage) {
                _self.renderer.handleError(errorMessage);
            });
    }

    editMovie(movieId) {
        let movie = this.getMovie(movieId);
        this.editMovieView.renderView(movie);
    }

    showMovieDetails(movieId) {
        let _self = this;
        let movie = this.movieModel.getMovie(movieId);
        this.movieModel.getMovie(movieId)
                .then(function (movie) {
                    _self.movieDetailsView.renderView(movie,comments);
                })
                .catch(function (errorMessage) {
                    _self.renderer.handleError(errorMessage);
                });
        let comments = this.commentController.getComments(movieId);
        // this.movieDetailsView.renderView(movie, comments);
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