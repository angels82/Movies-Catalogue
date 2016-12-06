class DeleteMovieView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movieController, movie) {
        let view = $(`
           <div id="viewDeleteMovie">
                <h1>Are you sure you want to delete this movie?</h1>
                <h2>${movie.title}</h2>
                <input type="hidden" name="movieId" value="${movie._id}"/>
                <br/>
            </div>
        `);

        view.append($('<button>Delete</button>').click(movieController.deleteMovie.bind(movieController)))
            .append(' ')
            .append($('<button>Cancel</button>').click(movieController.listMovies.bind(movieController)));

        this.renderer.renderView(view);
    }

    submitData() {
        let movieId = $('#viewDeleteMovie [name=movieId]').val();

        return movieId;
    }
}