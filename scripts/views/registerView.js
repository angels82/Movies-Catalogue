// Renders Register View
// Sends register data to userController through submitData()

class RegisterView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(userController) {
        let view = $(`
            <div id="viewRegister">
                <h1>Please register here</h1>
                <form id="formRegister">
                    <div>Username</div>
                    <div>
                        <input type="text" name="username" required />
                    </div>
                    <div>Password</div>
                    <div>
                        <input type="password" name="password" required />
                    </div>
                    <div>
                        <input type="submit" id="buttonRegisterUser" value="Register"/>
                    </div>
                </form>
            </div>
        `);

        view.find('form').submit(function(e){
            e.preventDefault();
        });

        view.find('#buttonRegisterUser')
            .click(userController.registerUser.bind(userController));


        this.renderer.renderView(view);
    }

    submitData() {
        let data = {
            username: $('#viewRegister [name=username]').val(),
            password: $('#viewRegister [name=password]').val()
        };

        return data;
    }
}