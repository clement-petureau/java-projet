import { fetchMovies } from './shared/api.js';

let page = 1;
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('movies-container');
const loadMoreButton = document.getElementById('load-more');

function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <a href="movie.html?id=${movie.imdbID}">More information</a>
    `;
    searchResults.appendChild(movieDiv);
  });
}

async function loadMovies() {
  const query = searchBar.value.trim();
  if (!query) {
    alert('Veuillez entrer un terme de recherche.');
    return;
  }
  const data = await fetchMovies(query, page);
  if (data && data.Search) {
    displayMovies(data.Search);
  } else {
    alert('Aucun film trouvé ou une erreur est survenue.');
  }
}

loadMoreButton.addEventListener('click', () => {
  page++;
  loadMovies();
});

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchResults.innerHTML = '';
    page = 1;
    loadMovies();
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('open');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
