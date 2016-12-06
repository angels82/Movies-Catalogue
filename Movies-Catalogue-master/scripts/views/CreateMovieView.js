// Renders the Create Movie View through the passed in renderer
// Sends movie data to moviesController by submitData()

class CreateMovieView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(eventHandler) {
        let view = $(`
           <div id="viewCreateMovie">
                <h1>Create new movie</h1>
                <form id="formCreateMovie">
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
                        <input type="submit" id="buttonCreateMovie" value="Create"/>
                    </div>
                </form>
            </div>
        `);

        view.find('form').submit(function(e){
            e.preventDefault();
        });

        view.find('#buttonCreateMovie').click(eventHandler);


        this.renderer.renderView(view);
    }

    submitData() {
        let data = {
            title:$('#viewCreateMovie [name=title]').val(),
            director:$('#viewCreateMovie [name=director]').val(),
            year:$('#viewCreateMovie [name=year]').val(),
            description:$('#viewCreateMovie [name=descr]').val(),
            trailerUrl:$('#viewCreateMovie [name=trailerUrl]').val()
        };

        return data;
    }
}