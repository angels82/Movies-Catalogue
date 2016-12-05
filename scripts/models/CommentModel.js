class CommentModel {
    constructor(requester, auth) {
        this.requester = requester;
        this.auth = auth;
    }

    get headers() {
        return this.auth.getHeaders();
    }

    createComment(movieId, data) {
        data.movieId = movieId;
        return this.requester.post('/comments', this.headers, data);
    }

    getComment(id) {
        return this.requester.get(`/comments/${id}`, this.headers);
    }

    getComments(movieId) {
        return this.requester.get(`/comments?query={"movieId":${movieId}}`, this.headers);
    }

    updateComment(id, data) {
        return this.requester.put(`/comments/${id}`, this.headers, data);
    }

    deleteComment(id) {
        return this.requester.delete(`/comments/${id}`, this.headers);
    }
}