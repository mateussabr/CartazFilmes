const modal_conteiner = document.getElementById('modal-conteiner')
const background_modal = document.getElementById('modal-background')

let current_object = {}

function backgroundClickHandler()
{
    overlay.classList.remove('open')
}

function closedModal()
{
    overlay.classList.remove('open')
}

function callFunctionsListMovies()
{
    if(isMovieAlreadyOnList(current_object.imdbID))
    {
        notie.alert({text: 'O filme já está na lista', type: 'error'})
        return null 
    }
    
    updateListMoviesUI(current_object)
    addListMoviesArray(current_object)
    updateLocalStorage()
    closedModal()
}

function createContentModal(data) {
    current_object = data;

    modal_conteiner.innerHTML =
        `
        <h2 id="movie-title">${data.Title} - ${data.Year}</h2>
        <section id="modal-main">
            <img src="${data.Poster}" alt="Poster do filme">
            <div id="movie-info">
                <div id="movie-plot">
                    <h3>Enredo:</h3> <h4>${data.Plot}</h4>
                </div>
                <div id="movie-cast">
                    <h3>Grupo:</h3> <h4>${data.Actors}</h4>
                </div>
                <div id="movie-genre">
                    <h3>Gênero:</h3> <h4>${data.Genre}</h4>
                </div>
            </div>
        </section>
        <section id="modal-footer">
            <button id="add-movie" onclick="callFunctionsListMovies()"><i class="bi bi-plus"></i>Adicionar na lista de filmes</button>
        </section>
    `;
}

background_modal.addEventListener('click', backgroundClickHandler)