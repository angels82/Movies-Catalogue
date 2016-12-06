class Authentication {
    constructor(appKey, appSecret) {
        this.appKey = appKey;
        this.appSecret = appSecret;
    }

    isLoggedIn() {
        return sessionStorage.getItem('authToken');
    }

    getToken() {
        return btoa(`${this.appKey}:${this.appSecret}`);
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (this.isLoggedIn()) {
            headers['Authorization'] = `Kinvey ${this.isLoggedIn()}`
        } else {
            headers['Authorization'] = `Basic ${this.getToken()}`
        }
        return headers;
    }

    getUsername() {
        return sessionStorage.getItem('username');
    }
}