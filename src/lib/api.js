import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error("Token is expired or not available");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
  }
);

export default api;
