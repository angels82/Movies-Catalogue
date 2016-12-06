// Renders the Edit Movie View through the passed in renderer
// Sends data to MovieController by submitData()

class EditMovieView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movie, movieController) {
        let view = $(`
           <div id="viewEditMovie">
                <h1>Edit movie</h1>
                <form id="formEditMovie" movieID="${movie._id}">
                    <div>Title</div>
                    <div>
                        <input type="text" name="title" required />
                    </div>
                    <div>Director</div>
                    <div>
                        <input type="text" name="director" required />
                    </div>
                    <div>Year</div>
                    <div>
                        <input type="number" name="year" required />
                    </div>
                    <div>Description</div>
                    <div>
                        <textarea name="descr" rows="10"></textarea>
                    </div>
                    <div>Trailer Url (youtube):</div>
                    <div>
                         <input type="text" name="trailerUrl">
                    </div>
                    <div>
                        <input type="submit" id="buttonEditMovie" value="Save"/>
                    </div>
                </form>
            </div>
        `);

        view.find('form').submit(function(e){
            e.preventDefault();
        });

        view.find('#formEditMovie [name=title]').val(movie.title);
        view.find('#formEditMovie [name=director]').val(movie.director);
        view.find('#formEditMovie [name=year]').val(movie.year);
        view.find('#formEditMovie [name=descr]').val(movie.description);
        view.find('#formEditMovie [name=trailerUrl]').val(movie.trailerUrl);

        view.find('#buttonEditMovie').click(movieController.editMovie.bind(movieController));


        this.renderer.renderView(view);
    }

    submitData() {
        let data = {
            _id: $('#formEditMovie').attr('movieID'),
            title: $('#formEditMovie [name=title]').val(),
            director: $('#formEditMovie [name=director]').val(),
            year: $('#formEditMovie [name=year]').val(),
            description: $('#formEditMovie [name=descr]').val(),
            trailerUrl: $('#formEditMovie [name=trailerUrl]').val()
        };

        return data;
    }
}