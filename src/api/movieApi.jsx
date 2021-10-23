const API_KEY = "ef287635cf7a64563c38f77279f06225";
const BASE_URL = "https://api.themoviedb.org/3/";

export async function movieAPI(url = "", config = {}) {
  const response = await fetch(url, config);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`no images on request`));
}

export function fetchMovieTrend() {
  return movieAPI(
    `${BASE_URL}trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
  );
}
export function fetchSearch(query) {
  return movieAPI(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
}

export function fetchMovieDetails(movieId) {
  return movieAPI(
    `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchActorsDetail(movieId) {
  return movieAPI(
    `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
}
export function fetchReviews(movieId) {
  return movieAPI(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
