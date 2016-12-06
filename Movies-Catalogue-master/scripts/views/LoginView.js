// Renders Login View
// Sends login data to userController

 class LoginView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(eventHandler) {
        let view = $(`
            <div id="viewLogin">
                <h1>Please login</h1>
                <form id="formLogin">
                    <div>Username</div>
                    <div>
                        <input type="text" name="username" required />
                    </div>
                    <br/>
                    <div>Password</div>
                    <div>
                        <input type="password" name="password" required />
                    </div>
                    <br/>
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
            .click(eventHandler);

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
