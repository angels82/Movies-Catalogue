// Renders Login View
// Sends login data to userController

class LoginView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView() {
        let view = $('<div>');
        alert('Login');
        this.renderer.renderView(view);
    }

    submitData() {
        let data = {};

        return data;
    }
}