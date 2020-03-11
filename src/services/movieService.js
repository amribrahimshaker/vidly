import http from "./httpService";

import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  // return apiEndpoint + "/" + id;
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}
export function getMovie(movieId) {
  // return http.get(apiEndpoint + "/" + movieId);
  return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
export function saveMovie(movie) {
  // {_id: "5e645986a8b9723f5c01a0d5", title: "Airplane", genreId: "5e645986a8b9723f5c01a0d4", numberInStock: 5, dailyRentalRate: 2}
  // console.log("movie", movie);
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}
