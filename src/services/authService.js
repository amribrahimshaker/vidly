import jwtDecode from "jwt-decode";
import http from "./httpService";

import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt); //user {_id: "5e65975a3e6610355c2ba43e", name: "Mervat", email: "user2@domain.com", iat: 1583716187}
    // console.log("user", user);
    return user;
    // this.setState({ user });
  } catch (ex) {
    return null;
    // console.log(ex); //InvalidTokenError {message: "Invalid token specified"}
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
