// Renders links, greeting message, info and errors
// Renders views from jquery elements sent by the View classes

class Renderer {
    constructor(authService) {
        this.authService = authService;
    }

    setLinks(notLoggedLinks, loggedLinks) {
        this.notLoggedLinksIds = notLoggedLinks.map(link => '#' + link.attr('id'));
        this.loggedLinks = loggedLinks.map(link => '#' + link.attr('id'));
    }

    renderLinks() {
        if (this.authService.isLoggedIn()) {
            this.notLoggedLinksIds.forEach((id) => $(id).hide());
            this.loggedLinks.forEach((id) => $(id).show());
        } else {
            this.loggedLinks.forEach((id) => $(id).hide());
            this.notLoggedLinksIds.forEach((id) => $(id).show());
        }
    }

    renderGreeting() {
        $('#loggedInUser').empty();

        if(this.authService.isLoggedIn())
            $('#loggedInUser').text('Welcome, ' + this.authService.getUsername() + '!');
    }

    renderView(element) {
        $('#errorBox').hide();
        this.renderLinks();
        this.renderGreeting();

        $('#view').empty();
        $('#view').append(element);
    }

    renderInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
        $('#infoBox').click(function() {
            $(this).fadeOut();
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