// Renders the Edit Movie View through the passed in renderer
// Sends data to MovieController by submitData()

class EditMovieView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movie) {
        let view = $('<div>');

        this.renderer.renderView(view);
    }

    submitData() {
        let data = {};

        return data;
    }
}