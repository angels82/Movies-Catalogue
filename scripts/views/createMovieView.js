// Renders the Create Movie View through the passed in renderer
// Sends movie data to moviesController by submitData()

class CreateModelView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView() {
        let view = $('<div>');

        this.renderer.renderView(view);
    }

    submitData() {
        let data = {};

        return data;
    }
}