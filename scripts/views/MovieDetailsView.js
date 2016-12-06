//TODO: add comments author


class MovieDetailsView {
    constructor(rendrer) {
        this.renderer = rendrer;
    }

    renderView(movie, comments) {
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
                <div class="movieViewHeader">${movie.description}</div>
                <div class="movieViewHeader" id="comments">Comments:</div>
            </div>
            `
        );

        if (comments.length>0){
            console.log(comments.length)
            view.find('#comments').append($('<ul>').addClass("comment-list"));
            for (let comment of comments){
                view.find('#comments .comment-list')
                    .append($('<li>')
                        .text(comment.text));
            }

        } else {
            view.find('#comments').append($('<div>').text('No comments'))
        }

        this.renderer.renderView(view);
    }
}