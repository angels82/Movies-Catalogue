// Renders Register View
// Sends register data to userController through submitData()

class RegisterView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView() {
        let view = $('<div>');

        this.renderer.renderView(view);
    }

    submitData() {
        let data = {username: 'b', password: 'b'};

        return data;
    }
}