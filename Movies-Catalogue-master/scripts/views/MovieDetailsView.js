class MovieDetailsView {
    constructor(rendrer) {
        this.renderer = rendrer;
    }

    renderView(movie, comments, movieController) {
        let view = $(
            `
            <div movieId=${movie._id} class="movieDetailsView">
                <div class="movieViewHeader">Title:</div>
                <div class="movieViewData">${movie.title}</div>
                <div class="movieViewHeader">Director:</div>
                <div class="movieViewData">${movie.director}</div>
                <div class="movieViewHeader">Year:</div>
                <div class="movieViewData">${movie.year}</div>
                <div class="movieViewHeader">Description:</div>
                <div class="movieViewData">${movie.description}</div>
                <br/>
                <div class="movieViewHeader" id="comments">Comments:</div>
            </div>
            `
        );
// Add trailer if specified
        if (movie.trailerUrl){
            let embededUrl = 'https://www.youtube.com/embed/' + movie.trailerUrl.split('=').pop();
            $(` <br>
                <div id="trailer">
                    <iframe  width="420" height="315"
                        src="${embededUrl}">
                    </iframe>
                </div>
            `).insertBefore(view.find('#comments'));
        }

//List the comments
        if (comments.length>0){
            view.find('#comments').append($('<ul>').addClass("comment-list"));
            for (let comment of comments){
                let commentLi = $('<li>')
                        .append($('<div class="commentAuthor">').text(comment.author + ':'))
                        .append($('<div class="commentText">').text('"' + comment.text + '"'));
                if(comment.author == sessionStorage.getItem('username')) {
                    commentLi
                        .append($('<button id="buttonEditComment">Edit</button>')
                            .click(movieController.showEditCommentView.bind(movieController, movie, comment)))
                        .append(' ')
                        .append($('<button id="buttonDeleteComment">Delete</button>')
                            .click(movieController.showDeleteCommentView.bind(movieController, movie, comment)));
                }

                view.find('#comments .comment-list')
                    .append(commentLi);
            }
        } else {
            view.find('#comments').append($('<div>').text('No comments'))
        }

        view.append($('<div>')
            .append($('<button id="buttonAddComment">Add Comment</button>')
                .click(movieController.showCommentView.bind(movieController, movie))));

        this.renderer.renderView(view);
    }
}