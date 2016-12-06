// Renders Login View
// Sends login data to userController

 class LoginView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(userController) {
        let view = $(`
            <div id="viewLogin">
                <h1>Please login</h1>
                <form id="formLogin">
                    <div>Username</div>
                    <div>
                        <input type="text" name="username" required />
                    </div>
                    <div>Password</div>
                    <div>
                        <input type="password" name="password" required />
                    </div>
                    <div>
                        <input type="submit" id="buttonLoginUser" value="Login"/>
                    </div>
                </form>
            </div>
        `);
        view.find('form').submit(function(e){
            e.preventDefault();
        });

        view.find('#buttonLoginUser')
            .click(userController.logInUser.bind(userController));

        this.renderer.renderView(view);
    }

    submitData() {
        let data = {
            username: $('#viewLogin [name=username]').val(),
            password: $('#viewLogin [name=password]').val(),
        };
        return data;
    }
}
