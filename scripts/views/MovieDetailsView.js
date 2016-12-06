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
                <div class="titleForm">Description:</div>
                <div class="movieViewHeader">${movie.description}</div>
            </div>
            `
        );

        this.renderer.renderView(view);
    }
}