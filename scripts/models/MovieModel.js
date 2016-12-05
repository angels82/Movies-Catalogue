// GET
// Get data from movies collection
// and sends it to moviesController

// POST
// Receives movie data from moviesController
// and posts it to the movies collection

//  PUT
// Receives movie data from moviesController
// and puts it to the movies collection

// DELETE
// Receives movie id from moviesController
// and deletes a movie from movies collection

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