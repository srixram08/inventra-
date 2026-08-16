import axios from "axios";

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== "undefined") {
    if (window.location.port === "5173" || window.location.port === "3000") {
      return "http://localhost:5000/api";
    }
    return "/api";
  }
  return "/api";
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
