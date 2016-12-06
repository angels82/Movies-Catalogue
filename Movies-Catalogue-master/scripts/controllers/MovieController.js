// Receives user data from movie views
// and sends it to the moviesModel
// then handles the result from the request

class MovieController {
    constructor(movieModel, commentModel, homeView, listMoviesView, createMovieView, editMovieView, movieDetailsView, addCommentView, editCommentView, deleteCommentView, renderer) {
        this.movieModel = movieModel;
        this.commentModel = commentModel;
        this.homeView = homeView;
        this.listMoviesView = listMoviesView;
        this.createMovieView = createMovieView;
        this.editMovieView = editMovieView;
        this.movieDetailsView = movieDetailsView;
        this.addCommentView = addCommentView;
        this.editCommentView = editCommentView;
        this.deleteCommentView = deleteCommentView;
        this.renderer = renderer;
    }

    listMovies() {
        let _self = this;

        this.movieModel.getMovies()
            .then(function (movies) {
                _self.listMoviesView.renderView(movies, _self, 'Movies');
                _self.renderer.renderInfo('Movies loaded.');
            })
            .catch((errorMessage) => _self.handleError(errorMessage));
    }

    listMyMovies() {
        let _self = this;

        this.movieModel.getMovies()
            .then(function (movies) {
                let myMovies = movies.filter((movie) => movie._acl.creator == sessionStorage.getItem('userId'));
                _self.listMoviesView.renderView(myMovies, _self,'My Movies');
                _self.renderer.renderInfo('Movies loaded.');
            })
            .catch((errorMessage) => _self.handleError(errorMessage));
    }

    editMovie() {
        let _self=this;
        let movieData = _self.editMovieView.submitData();
        this.movieModel.updateMovie(movieData._id, movieData).then(function(){
            _self.listMyMovies();
            _self.renderer.renderInfo('Movie Edited.');
        })
    }

    loadMovieForEdit(movieId){
        let _self = this;
        this.movieModel.getMovie(movieId).then(function(movie){
            _self.editMovieView.renderView(movie, _self);
        })
    }

    showMovieDetails(movieId) {
        let _self = this;
        let p1 = this.movieModel.getMovie(movieId);
        let p2 = this.commentModel.getComments(movieId);

        Promise.all([p1,p2]).then(function([movie,comments]){
            _self.movieDetailsView.renderView(movie,comments, _self);
            _self.renderer.renderInfo('Movie details loaded.');
        }).catch((errorMessage) => _self.handleError(errorMessage));
    }


    createMovie() {
        let _self = this;
        let movie = this.createMovieView.submitData();

        if (movie.title == ''  || movie.director == '' || movie.year == '') return;

        this.movieModel.createMovie(movie)
            .then(function () {
                _self.renderer.renderInfo('Movie created.');
                _self.listMyMovies();
            })
            .catch((errorMessage) => _self.handleError(errorMessage));
    }

    deleteMovie(movieId) {
        let _self = this;
        this.movieModel.deleteMovie(movieId)
            .then(function(){
                _self.renderer.renderInfo('Movie deleted.');
                _self.listMyMovies();
            }).catch((errorMessage) => _self.handleError(errorMessage));
    }

    showCommentView(movie) {
        this.addCommentView.renderView(this, movie);
    }

    addComment() {
        let _self = this;
        let data = this.addCommentView.submitData();

        if (data.text == '') {
            this.handleError('Comment cannot be empty!');
            return;
        }

        this.commentModel.createComment(data)
            .then(function () {
                _self.renderer.renderInfo('Comment created.');
                _self.showMovieDetails(data.movieId);
            }).catch((errorMessage) => _self.handleError(errorMessage));

    }

    showEditCommentView(movie, comment) {
        this.editCommentView.renderView(this, movie, comment);
    }

    editComment() {
        let _self = this;
        let allData = this.editCommentView.submitData();
        let commentId = allData.commentId;
        let data = allData.data;

        if (data.text == '') {
            this.handleError('Comment cannot be empty!');
            return;
        }

        this.commentModel.updateComment(commentId, data)
            .then(function () {
                _self.renderer.renderInfo('Comment edited.');
                _self.showMovieDetails(data.movieId);
            }).catch((errorMessage) => _self.handleError(errorMessage));
    }

    showDeleteCommentView(movie, comment) {
        this.deleteCommentView.renderView(this, movie, comment);
    }

    deleteComment() {
        let _self = this;
        let data = this.deleteCommentView.submitData();

        this.commentModel.deleteComment(data.commentId).then(function () {
            _self.renderer.renderInfo('Comment deleted.');
            _self.showMovieDetails(data.movieId);
        }).catch((errorMessage) => _self.handleError(errorMessage));
    }

    handleError(errorMessage) {
        this.renderer.renderError(errorMessage);
    }
}