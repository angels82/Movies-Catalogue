// Renders Home View

class HomeView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView() {
        let view = $('<div>');

        this.renderer.renderView(view);
    }
}