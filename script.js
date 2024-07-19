const button_search = document.getElementById('button-search');
const overlay = document.getElementById('modal-overlay');
const movie_name = document.getElementById('input-name');
const movie_age = document.getElementById('input-age');
const movies_list_element = document.getElementById('movies-list');

let movie_list = JSON.parse(localStorage.getItem('movie_list')) || [];

async function buttonSearchClickHandler() {
    try {
        const key = key_api;
        const url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieAgeParameterGeneretor()}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.hasOwnProperty('Error')) {
            throw new Error('Filme não encontrado');
        }
        
        createContentModal(data);
        overlay.classList.add('open');
    } 
    catch (error) 
    {
        notie.alert({ text: error.message, type: 'error' });
    }
}


function movieNameParameterGenerator() {
    if (movie_name.value === '') {
        throw new Error('O nome do filme deve ser mencionado');
    }

    return movie_name.value.split(' ').join('+');
}

function movieAgeParameterGeneretor() {
    if (movie_age.value === '') {
        return '';
    } else if (movie_age.value.length !== 4 || isNaN(Number(movie_age.value))) {
        throw new Error('Ano do filme inválido');
    }

    return `&y=${movie_age.value}`;
}

function updateListMoviesUI(data) {
    movies_list_element.innerHTML +=
        `
        <article id="movie-cart-${data.imdbID}">
            <img src="${data.Poster}" alt="Poster do filme" width="300px">
            <button class="button-remove-movie" onclick="removeMovieFromList('${data.imdbID}')"><i class="bi bi-file-earmark-minus"></i> Remover</button>
        </article>
    `;
}

function isMovieAlreadyOnList(id) {
    return Boolean(movie_list.find(object => object.imdbID === id));
}

function addListMoviesArray(data) 
{
    if (!isMovieAlreadyOnList(data.imdbID)) 
    {
        movie_list.push(data);
    }
}

function removeMovieFromList(id) {
    movie_list = movie_list.filter(object => object.imdbID !== id);
    document.getElementById(`movie-cart-${id}`).remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('movie_list', JSON.stringify(movie_list));
}

// Iterar sobre a lista inicial de filmes para atualizar a interface
movie_list.forEach(movie => updateListMoviesUI(movie));

button_search.addEventListener('click', buttonSearchClickHandler);
