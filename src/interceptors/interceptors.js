import axios from "axios";
import { URL } from "../utils/config";
export const DeployedURL = axios.create({
  baseURL: URL.DeployedURL
});

DeployedURL.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);