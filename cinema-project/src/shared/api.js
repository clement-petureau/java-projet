const API_KEY = 'votre_api_key'; // Remplacez par votre clé OMDb.
const BASE_URL = 'https://www.omdbapi.com/';

export async function fetchMovies(query, page = 1) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
  const response = await fetch(url);
  return response.json();
}

export async function fetchMovieDetails(id) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
  const response = await fetch(url);
  return response.json();
}