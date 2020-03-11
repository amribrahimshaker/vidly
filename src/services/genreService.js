import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return http.get(apiUrl + "/genres");
  //   return http.get("http://localhost:3900/api/genres");
}
