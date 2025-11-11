import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
    const token = sessionStorage.getItem("access_token");
    return token ? children : <Navigate to="/" />;
};
export default ProtectRoute;