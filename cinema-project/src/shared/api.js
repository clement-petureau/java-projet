const API_KEY = 'ba646041'; 

async function apiRequest(params) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(`Erreur API : ${data.Error}`);
    }
  } catch (error) {
    console.error('Erreur dans apiRequest :', error.message);
    return null; 
  }
}

export async function fetchMovies(query, page = 1) {
  return apiRequest(`s=${query}&page=${page}`);
}

export async function fetchMovieDetails(id) {
  return apiRequest(`i=${id}&plot=full`);
}
