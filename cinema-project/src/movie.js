import { fetchMovieDetails } from './shared/api.js';

async function loadMovieDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    const data = await fetchMovieDetails(id);
    document.getElementById('movie-title').textContent = data.Title;
    document.getElementById('movie-poster').src = data.Poster;
    document.getElementById('movie-plot').textContent = data.Plot;
    document.getElementById('movie-genre').textContent = data.Genre;
    document.getElementById('movie-actors').textContent = data.Actors;
    document.getElementById('movie-ratings').textContent = data.imdbRating || 'N/A';
    document.getElementById('movie-dvd').textContent = data.DVD || 'Non disponible';
  }
}

loadMovieDetails();