import axios from "axios";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/',
    baseURL: 'http://3.135.9.244:8000/',
  });

export function Loader(){
    const [loading, setLoading] = useState(false);

    Api.interceptors.request.use(
      function (config) {
        setLoading(true);
  
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
    Api.interceptors.response.use(
        function (response) {
          setLoading(false);
        return Promise.resolve(response);
        },
        function (error) {
            setLoading(false);
            return Promise.reject(error);
          }
    )

return (
    <>
      <Backdrop  sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0,0,0,0.2)",
      }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
};
