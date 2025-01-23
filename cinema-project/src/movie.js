import { fetchMovieDetails } from './shared/api.js';

async function loadMovieDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  console.log("ID du film récupéré :", id);

  if (id) {
    try {
      const data = await fetchMovieDetails(id);
      console.log("Données du film :", data);

      if (data) {
        document.getElementById('movie-title').textContent = data.Title || 'Titre non disponible';
        document.getElementById('movie-poster').src = data.Poster || 'url par défaut';
        document.getElementById('movie-plot').textContent = data.Plot || 'Résumé non disponible';
        document.getElementById('movie-genre').textContent = data.Genre || 'Genre non disponible';
        document.getElementById('movie-actors').textContent = data.Actors || 'Acteurs non disponibles';
        document.getElementById('movie-ratings').textContent = data.imdbRating || 'N/A';
        document.getElementById('movie-dvd').textContent = data.DVD || 'Non disponible';
      } else {
        console.log("Aucune donnée trouvée pour cet ID.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données du film :", error);
    }
  } else {
    console.log("Aucun ID trouvé dans l'URL.");
  }
}

loadMovieDetails();
