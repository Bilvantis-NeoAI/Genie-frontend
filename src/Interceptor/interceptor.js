import axios from "axios";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { URL } from "../utils/config";
export const Api = axios.create({
  baseURL:URL.Api,
});
export const ApiInject = axios.create({
  baseURL: URL.ApiInject
});

export const ApiAnswer = axios.create({
  baseURL: URL.ApiAnswer
});
export const GitIngestion = axios.create({
  baseURL: URL.GitIngestion,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding dynamic Authorization header for GitIngestion
GitIngestion.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const Metric = axios.create({
  baseURL: URL.Metric,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding dynamic Authorization header for Metric
Metric.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const addInterceptors = (axiosInstance, setLoading) => {
  axiosInstance.interceptors.request.use(
    function (config) {
      setLoading(true);
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    function (response) {
      setLoading(false);
      return response;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

// Loader component
export function Loader() {
  const [loading, setLoading] = useState(false);

  // Add interceptors to all axios instances
  addInterceptors(Api, setLoading);
  addInterceptors(ApiInject, setLoading);
  addInterceptors(ApiAnswer, setLoading);

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
