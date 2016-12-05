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

    logInUser() {
        let userData = this.loginView.submitData();
        let _self = this;

        this.model.login(userData).then(function (data) {
            sessionStorage.setItem('authToken', data._kmd.authtoken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('username', data.username);
            console.log(this.renderer);
            _self.renderer.renderInfo('Login successful.');
        }).catch();


    }

    registerUser() {
        let userData = this.registerView.submitData();
        let _self = this;

        this.model.register(userData).then(function (data) {
            sessionStorage.setItem('authToken', data._kmd.authtoken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('username', data.username);

            _self.renderer.renderInfo('Registration successful.');
        }).catch();
    }

    logOutUser() {
        let _self = this;

        this.model.logout().then(function () {
            sessionStorage.clear();

            _self.renderer.renderInfo('Logout successful.');
        }).catch();
    }

    handleError(errorMessage) {
        this.renderer.renderError(errorMessage);
    }
}