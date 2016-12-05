// Renders links, greeting message, info and errors
// Renders views from jquery elements sent by the View classes

class Renderer {
    constructor(authService) {
        this.authService = authService;
    }

    setLinks(notLoggedInEvents, loggedInEvents) {
        this.notLoggedUserLinks = notLoggedUserLinks;
        this.loggedUserLinks = loggedUserLinks;
    }

    renderLinks() {
        $('#menu').empty();
        let links = [];

        if(this.authService.isLoggedIn())
            links = this.loggedUserLinks;
        else
            links = this.notLoggedUserLinks;

        links.forEach((link) => {
            $('#menu').append(link);
        });
    }

    renderGreeting() {
        $('#loggedInUser').empty();

        if(this.authService.isLoggedIn())
            $('#loggedInUser').text('Welcome, ' + this.authService.getUsername());
    }

    renderView(element) {
        this.renderLinks();
        this.renderGreeting();

        $('#view').empty();
        $('#view').append(element);
    }

    renderInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        $('#infoBox').click(function() {
            $(this).fadeOut()
        });
    }

    renderError(response) {
        let errorMessage = JSON.stringify(response);
        if(response.readyState === 0)
            errorMessage = "Cannot connect due to network error.";
        if(response.responseJSON && response.responseJSON.description)
            errorMessage = response.responseJSON.description;
        showError(errorMessage);


        function showError(errorMsg) {
            $('#errorBox').text('Error: ' + errorMsg);
            $('#errorBox').show();
            $('#errorBox').click(function() {
                $(this).fadeOut()
            });
        }
    }
}