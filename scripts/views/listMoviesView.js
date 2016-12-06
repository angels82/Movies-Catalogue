// Renders List Movies View in a table through the passed in renderer
// Appends links to to the separate entities in the table based on the logged in user authentication

//TODO: implement action links


class ListMoviesView {
    constructor(renderer) {
        this.renderer = renderer;
    }

    renderView(movies, movieController, viewTitle) {
        // let editAction = movieController.editMovie;
        // let deleteAction  = movieController.deleteMovie;
        // let detailsAction = movieController.showMovieDetails;

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
            view.find('#movies').append(createMovieRow(movie, movieController));
        }
        // alert(movies);
        this.renderer.renderView(view);

        function createMovieRow(movie, movieController){
            let row =  $(`
                <tr movieID=${movie._id}>
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.year}</td>
                    <td>${movie.description}</td>
                    <td class="movieActions">
                        <a href="#" id="buttonDetails">[Details]</a>
                    </td>
                </tr>
            `);
            row.find('#buttonDetails').click(movieController.showMovieDetails.bind(movieController,movie._id));

            if (movie._acl.creator == sessionStorage.getItem('userId')){
                row.find('.movieActions')
                    .append($('<a href="#">')
                        .attr('id','buttonEdit')
                        .text("[Edit]")
                        .click(movieController.editMovie.bind(movieController,movie._id)))
                    .append($('<a href="#">')
                        .attr('id','buttonDelete')
                        .text("[Delete]")
                        .click(movieController.deleteMovie.bind(movieController,movie._id)));
                    // `
                    //     <a href="#">[Edit]</a>
                    //     <a href="#">[Delete]</a>
                    // `
                // ))
            }

            return row;
        }
    }
}