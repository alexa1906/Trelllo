import axios from "axios";
import { refresh } from "../api/services/auth";
import tokenService from "./token";

const app = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

app.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

app.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();
        if (refreshToken) {
          const token = await refresh(refreshToken);
          if (token) {
            tokenService.saveToken(token);
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } else {
          throw new Error("No refresh token available");
        }
      } catch (error) {
        console.log("Token refresh failed:", error);
      }
    }

    return Promise.reject(error);
  }
);

export default app;
