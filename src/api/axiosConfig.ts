import axios from "axios";
import { baseUrl } from "./baseUrl";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 60, // One Minute
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.headers.token = token;

  return config;
});
