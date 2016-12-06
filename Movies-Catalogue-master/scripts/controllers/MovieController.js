// Receives user data from movie views
// and sends it to the moviesModel
// then handles the result from the request

class MovieController {
    constructor(movieModel, commentModel, homeView, listMoviesView, createMovieView, editMovieView, movieDetailsView, addCommentView, renderer) {
        this.movieModel = movieModel;
        this.commentModel = commentModel;
        this.homeView = homeView;
        this.listMoviesView = listMoviesView;
        this.createMovieView = createMovieView;
        this.editMovieView = editMovieView;
        this.movieDetailsView = movieDetailsView;
        this.addCommentView = addCommentView;
        this.renderer = renderer;
    }

    listMovies() {
        let _self = this;

        this.movieModel.getMovies()
            .then(function (movies) {
                _self.listMoviesView.renderView(movies, _self, 'Movies');
                // _self.renderer.renderInfo('Movies loaded.');
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
                // _self.renderer.renderInfo('My Movies loaded.');
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
        let p1 = this.movieModel.getMovie(movieId);
        let p2 = this.commentModel.getComments(movieId);

        Promise.all([p1,p2]).then(function([movie,comments]){
            _self.movieDetailsView.renderView(movie,comments, _self);

        }).catch(function (errorMessage) {
            _self.renderer.handleError(errorMessage);
        });
    }


    createMovie() {
        let _self = this;
        let movie = this.createMovieView.submitData();

        this.movieModel.createMovie(movie)
            .then(function () {
                _self.renderer.renderInfo('Movie created.');
                _self.listMyMovies();
            })
            .catch(function (errorMessage) {
                _self.renderer.handleError(errorMessage);
            });
    }

    deleteMovie(movieId) {
        let _self = this;
        this.movieModel.deleteMovie(movieId).then(function(){
            _self.listMyMovies();
            _self.renderer.renderInfo('Movie deleted.');
        })


    }

    showEditCommentView(commentId) {
    }

    deleteComment(commentId) {
    }

    showCommentView(movie) {
        this.addCommentView.renderView(this, movie);
    }

    addComment() {
        let data = this.addCommentView.submitData();

        this.commentModel.createComment(data);
        this.showMovieDetails(data.movieId);
    }
}