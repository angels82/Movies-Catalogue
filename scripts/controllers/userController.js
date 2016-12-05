// Receives user data from movie views
// and sends it to the moviesModel

// Sends registration/login data to userModel
// and handles the result from the request

class UserController {
    constructor(model, loginView, registerView, listMoviesView, homeView, renderer) {
        this.model = model;
        this.loginView = loginView;
        this.registerView = registerView;
        this.listMoviesView = listMoviesView;
        this.homeView = homeView;
        this.renderer= renderer;
    }

    showLogin() {
        this.loginView.renderView();
    }

    showRegister() {
        this.registerView.renderView();
    }

    logInUser() {
        let data = this.loginView.submitData();

        function success(data) {
            sessionStorage.setItem('authToken', data._kmd.authtoken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('username', data.username);

            this.renderer.renderInfo('Login successful.');
        }
    }

    registerUser() {
        let data = this.registerView.submitData();

        function success(data) {
            sessionStorage.setItem('authToken', data._kmd.authtoken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('username', data.username);

            this.renderer.renderInfo('Registration successful.');
        }
    }

    logOutUser() {


        function success() {
            sessionStorage.clear();

            this.renderer.renderInfo('Logout successful.');
        }
    }

    handleError(errorMessage) {
        this.renderer.renderError(errorMessage);
    }
}