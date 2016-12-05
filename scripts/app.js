(function () {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_BykT85ZQx";
    const appSecret = "ca246b15f1a648e19f05adffcefc0401";

    let authenticationService = new AuthenticationService(appKey, appSecret);
    let requester = new Requester();
    let renderer = new Renderer(authenticationService);

    let homeView = new HomeView(renderer);
    let loginView = new LoginView(renderer);
    let registerView = new RegisterView(renderer);
    let listMoviesView = new ListMoviesView(renderer);
    let createMovieView = new CreateModelView(renderer);
    let editMovieView = new EditMovieView(renderer);
    let movieDetailsView = new MovieDetailsView(renderer);

    let userModel = new UserModel();
    let movieModel = new MoviesModel();
    let commentModel = new CommentModel();

    let userController = new UserController(userModel, loginView, registerView, listMoviesView, homeView, renderer);
    let movieController =
        new MovieController(movieModel, commentModel, homeView, listMoviesView, createMovieView, editMovieView, movieDetailsView, renderer);
    let commentController = new CommentsController(commentModel);

    const notLoggedUserLinks = [
        $('<a href="#" id="linkHome">Home</a>').click(movieController.showHome),
        $('<a href="#" id="linkLogin">Login</a>').click(userController.showLogin),
        $('<a href="#" id="linkRegister">Register</a>').click(userController.showRegister)
    ];
    const loggedUserLinks = [
        $('<a href="#" id="linkListMovies">List Movies</a>').click(movieController.listMovies),
        $('<a href="#" id="linkListMyMovies">My Movies</a>').click(movieController.listMyMovies),
        $('<a href="#" id="linkCreateMovie">Create Movie</a>').click(movieController.createMovie),
        $('<a href="#" id="linkLogout">Logout</a>').click(userController.logOutUser)
    ];
    renderer.setLinks(notLoggedUserLinks, loggedUserLinks);


}());