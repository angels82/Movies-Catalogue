class MovieDetailsView {
    constructor(rendrer) {
        this.renderer = rendrer;
    }

    renderView(movie, comments) {
        let view = $('<div>');

        this.renderer.renderView(view);
    }
}