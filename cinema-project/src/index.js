import { fetchMovies } from './shared/api.js';

let page = 1;
const moviesContainer = document.getElementById('movies-container');
const loadMoreButton = document.getElementById('load-more');

function displayTrendingMovies(movies) {
  movies.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <a href="movie.html?id=${movie.imdbID}">More information</a>
    `;
    moviesContainer.appendChild(movieDiv);
  });
}

async function loadTrendingMovies() {
  const data = await fetchMovies('trending', page);

  if (data && data.Search) {
    displayTrendingMovies(data.Search);
  } else {
    alert('Aucun film trouvé ou une erreur est survenue.');
  }
}

loadMoreButton.addEventListener('click', () => {
  page++;
  loadTrendingMovies();
});

loadTrendingMovies();

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
