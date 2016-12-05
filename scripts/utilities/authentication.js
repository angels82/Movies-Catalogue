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
        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.isLoggedIn() || this.getToken()}`
        };
    }
}