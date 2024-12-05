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
  baseURL : URL.GitIngestion
})
export const Metric = axios.create({
  baseURL : URL.Metric
})
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
