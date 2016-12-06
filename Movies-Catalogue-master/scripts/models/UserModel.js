// Receives register/login data from userController
// Performs registration/login in Kinvey
// On success sends authtoken to userController

class UserModel {
    constructor(requester, auth) {
        this.requester = requester;
        this.auth = auth;
    }

    login(userData) {
        return this.requester.login('/login', this.auth.getHeaders(), userData);
    }

    register(userData) {
        return this.requester.login('', this.auth.getHeaders(), userData);
    }

    logout() {
        sessionStorage.clear();
        return this.requester.login('', this.auth.getHeaders(), {});
    }
}

