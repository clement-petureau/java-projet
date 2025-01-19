import { fetchMovies } from './shared/api.js';

let page = 1;

async function searchMovies(query) {
  const resultsContainer = document.getElementById('search-results');
  const data = await fetchMovies(query, page);
  data.Search.forEach(movie => {
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <a href="movie.html?id=${movie.imdbID}">En savoir plus</a>
    `;
    resultsContainer.appendChild(resultDiv);
  });
}

document.getElementById('search-bar').addEventListener('input', (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    document.getElementById('search-results').innerHTML = '';
    searchMovies(query);
  }
});

document.getElementById('load-more').addEventListener('click', () => {
  const query = document.getElementById('search-bar').value;
  if (query.length > 2) {
    page++;
    searchMovies(query);
  }
});