import { fetchMovies } from './shared/api.js';

let page = 1; 
const moviesContainer = document.getElementById('movies-container');
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
    moviesContainer.appendChild(movieDiv);
  });
}

async function loadTrendingMovies() {
  try {
    const data = await fetchMovies('harry potter', page);
    console.log('Films tendance reçus:', data); 

    if (data && data.Search) {
      displayMovies(data.Search.slice(0, 3)); 
    } else {
      alert('Aucun film tendance trouvé.');
    }
  } catch (error) {
    console.error('Erreur lors du chargement des films tendance:', error);
    alert('Impossible de charger les films tendance.');
  }
}

async function loadMoviesFrom2024() {
  const data = await fetchMovies('2024', page, { year: 2024 }); 

  if (data && data.Search) {
    displayMovies(data.Search);
  } else {
    alert('Aucun film de 2024 trouvé ou une erreur est survenue.');
  }
}


loadMoreButton.addEventListener('click', () => {
  page++; 
  loadMoviesFrom2024();
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

