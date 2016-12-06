// Renders Home View

class HomeView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView() {
        let view = $('<div id="viewHome"><h1>Welcome</h1>Welcome to our movie catalogue.</div>');

        this.renderer.renderView(view);
    }
}