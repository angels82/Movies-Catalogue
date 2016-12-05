// Renders List Movies View in a table through the passed in renderer
// Appends links to to the separate entities in the table based on the logged in user authentication

class ListMoviesView {
    constructor(renderer, movieController) {
        this.renderer = renderer;
        this.movieController = movieController;
    }

    renderView(movies) {
        let view = $('<div>');

        this.renderer.renderView(view);
    }
}