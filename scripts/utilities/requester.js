function request(method, url, headers, data) {
    return $.ajax({
        method,
        url,
        headers,
        data: JSON.stringify(data)
    });
}

class Requester {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.userURL = baseURL.replace('appdata', 'user');
    }

    get(path, headers) {
        return request('GET', this.baseURL + path, headers);
    }

    post(path, headers, data) {
        return request('POST', this.baseURL + path, headers, data);
    }

    put(path, headers, data) {
        return request('PUT', this.baseURL + path, headers, data);
    }

    delete(path, headers) {
        return request('DELETE', this.baseURL + path, headers);
    }

    login(path, headers, data) {
        return request('POST', this.userURL + path, headers, data);
    }

    register(path, headers, data) {
        return request('POST', this.userURL + path, headers, data);
    }

    logout(path, headers) {
        return request('POST', this.userURL + path, headers);
    }
}