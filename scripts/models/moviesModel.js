class MovieModel {
    constructor(requester, auth) {
        this.requester = requester;
        this.auth = auth;
    }

    headers() {
        return this.auth.getHeaders();
    }

    createMovie(data) {
        return this.requester.post('/movies', data, this.headers());
    }

    getMovie(id) {
        return this.requester.get(`/movies/${id}`, this.headers());
    }

    getMovies() {
        return this.requester.get('/movies', this.headers());
    }

    updateMovie(id, data) {
        return this.requester.put(`/movies/${id}`, data, this.headers())
    }

    deleteMovie(id) {
        return this.requester.delete(`/movies/${id}`, this.headers());
    }
}