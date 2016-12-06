// Renders List Movies View in a table through the passed in renderer
// Appends links to to the separate entities in the table based on the logged in user authentication

//TODO: implement action links


class ListMoviesView {
    constructor(renderer, movieController) {
        this.renderer = renderer;
        this.movieController = movieController;
    }

    renderView(movies,viewTitle) {
        let view = $(`
           <div id="viewMovies">
                <h1>${viewTitle}</h1>
                <table id="movies">
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
    
                </table>
            </div>
        `);
        for (let movie of movies){
            view.find('#movies').append(createMovieRow(movie));
        }
        // alert(movies);
        this.renderer.renderView(view);

        function createMovieRow(movie){
            return $(`
                <tr>
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.year}</td>
                    <td>${movie.description}</td>
                    <td id="actions">
                        <a href="#">[Details]</a>     
                    </td>
                </tr>
            `);
        }
    }
}