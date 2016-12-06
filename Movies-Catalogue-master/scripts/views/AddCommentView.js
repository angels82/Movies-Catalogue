class AddCommentView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movieController, movie) {
        let view = $(`
           <div id="viewAddComment">
                <h1>Add comment for "${movie.title}"</h1>
                <form id="formAddComment">
                <input type="hidden" name="movieId" value="${movie._id}">
                    <div>
                        <textarea name="commentText" rows="10"></textarea>
                    </div>
                    <div>
                        <input type="submit" id="buttonAddComment" value="Add Comment"/>
                    </div>
                </form>
            </div>
        `);

        view.find('form').submit(function(e){
            e.preventDefault();
            movieController.addComment();
        });

        view.find('h1').text(`Add comment for "${movie.title}"`);

        this.renderer.renderView(view);
    }

    submitData() {
        let data = {
            text:$('#viewAddComment [name=commentText]').val(),
            author: sessionStorage.getItem('username'),
            movieId: $('#viewAddComment [name=movieId]').val(),
        };

        return data;
    }
}