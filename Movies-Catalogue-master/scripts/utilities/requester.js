function request(method, url, headers, data) {
    return $.ajax({
        method,
        url,
        headers,
        data: JSON.stringify(data)
    });
}

function htmlEscape(string){
    let entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function escapeObject(data){

    for (let label in data){
        data[label] = htmlEscape(data[label]);
    }
    return data;
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
        return request('POST', this.baseURL + path, headers, escapeObject(data));
    }

    put(path, headers, data) {
        return request('PUT', this.baseURL + path, headers, escapeObject(data));
    }

    delete(path, headers) {
        return request('DELETE', this.baseURL + path, headers);
    }

    login(path, headers, data) {
        return request('POST', this.userURL + path, headers, escapeObject(data));
    }

    register(path, headers, data) {
        return request('POST', this.userURL + path, headers, escapeObject(data));
    }

    logout(path, headers) {
        return request('POST', this.userURL + path, headers);
    }
}