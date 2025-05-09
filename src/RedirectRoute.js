import React from "react";
import { Navigate } from "react-router-dom";

const RedirectRoute = ({ children }) => {
    const token = sessionStorage.getItem("access_token");
    return token ? <Navigate to="/" /> : children;
};
export default RedirectRoute;