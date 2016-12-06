class DeleteCommentView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movieController, movie, comment) {
        let view = $(`
           <div id="viewDeleteComment">
                <h1>Are you sure you want to delete this comment for "${movie.title}"?</h1>
                <div>"${comment.text}"</div>
                <input type="hidden" name="commentId" value="${comment._id}"/>
                <input type="hidden" name="movieId" value="${movie._id}"/>
                <br/>
            </div>
        `);

        view.append($('<button>Delete</button>').click(movieController.deleteComment.bind(movieController)))
            .append(' ')
            .append($('<button>Cancel</button>').click(movieController.showMovieDetails.bind(movieController, movie._id)));

        this.renderer.renderView(view);
    }

    submitData() {
        let commentId = $('#viewDeleteComment [name=commentId]').val();
        let movieId = $('#viewDeleteComment [name=movieId]').val();

        return {commentId, movieId};
    }
}