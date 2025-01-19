import { fetchMovies } from './shared/api.js';

let page = 1;

async function loadTrendingMovies() {
  const container = document.getElementById('movies-container');
  const data = await fetchMovies('trending', page);
  data.Search.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <a href="movie.html?id=${movie.imdbID}">En savoir plus</a>
    `;
    container.appendChild(movieDiv);
  });
}

document.getElementById('load-more').addEventListener('click', () => {
  page++;
  loadTrendingMovies();
});

loadTrendingMovies();