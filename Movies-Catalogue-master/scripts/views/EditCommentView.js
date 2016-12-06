class EditCommentView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movieController, movie, comment) {
        let view = $(`
           <div id="viewEditComment">
                <h1>Edit comment for "${movie.title}"</h1>
                <form id="formEditComment">
                <input type="hidden" name="movieId" value="${movie._id}">
                <input type="hidden" name="commentId" value="${comment._id}">
                    <div>
                        <textarea name="commentText" rows="10">${comment.text}</textarea>
                    </div>
                    <div>
                        <input type="submit" id="buttonEditComment" value="Edit Comment"/>
                    </div>
                </form>
            </div>
        `);

        view.find('form').submit(function(e){
            e.preventDefault();
            movieController.editComment();
        });

        this.renderer.renderView(view);
    }

    submitData() {
        let commentId = $('#viewEditComment [name=commentId]').val();
        let data = {
            text:$('#viewEditComment [name=commentText]').val(),
            author: sessionStorage.getItem('username'),
            movieId: $('#viewEditComment [name=movieId]').val(),
        };

        return {commentId, data};
    }
}