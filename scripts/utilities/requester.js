class Requester {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    static request(method, url, headers, data) {
        return $.ajax({
            method,
            url,
            headers,
            data: JSON.stringify(data)
        });
    }

    get(path, headers) {
        return request('GET', this.baseURL + path, headers);
    }

    post(path, data, headers) {
        return request('POST', this.baseURL + path, headers, data);
    }

    put(path, data, headers) {
        return request('PUT', this.baseURL + path, headers, data);
    }

    delete(path, headers) {
        return request('DELETE', this.baseURL + path, headers);
    }
}