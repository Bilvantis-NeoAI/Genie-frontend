import axios from "axios";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Axios instances
export const Api = axios.create({
  baseURL: 'http://3.139.66.49:9002/', //  deploy url
  // baseURL: 'http://0.0.0.0:9002/', // local 
});

export const ApiInject = axios.create({
  baseURL: 'http://3.139.66.49:9001/', //  deploy url
  // baseURL: 'http://0.0.0.0:9001/', // local 
});

export const ApiAnswer = axios.create({
  baseURL: 'http://3.139.66.49:9000/', //  deploy url
  // baseURL: 'http://0.0.0.0:9000/', // local 
});
export const GitIngestion = axios.create({
  baseURL : 'http://localhost:9000' //local
})
export const Metric = axios.create({
  baseURL : 'http://localhost:3005' //local

})
export const Login =axios.create({
  baseURL: 'http://34.27.22.123:3000/' //deploy url
})
// Helper function to add interceptors to axios instances
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