import { useNavigate } from "react-router-dom";
import metricsIcon from "../Assets/Sidenavimgmetrics.svg";
import logoutIcon from "../Assets/logout.svg";
import { useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import { sweetalert } from "../utils/constatnts";
export default function SideNav() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("metrics");
    const handleNavigation = (path, tabName, state = {}) => {
        setActiveTab(tabName);
        navigate(path, { state });
    };
    const handleLogout = () => {
        Swal.fire({
            title: sweetalert.WARNING_TITLE,
            text: sweetalert.LOGOUT_CONFIRM_TEXT,
            icon: sweetalert.WARNING_ICON,
            showCancelButton: true,
            confirmButtonText: sweetalert.CONFIRM_BUTTON_TEXT,
            cancelButtonText: sweetalert.CANCEL_BUTTON_TEXT,
        }).then((result) => {
            if (result.isConfirmed) {
                setActiveTab("");
                navigate("/");
            }
        });
    };
    return (
        <>
            <div className="sidebar">
                <ul className="nav-list m-0 p-0">
                    <li
                        className={`d-flex justify-content-center align-items-center Iconstyles ${activeTab === "metrics" ? "active-tab" : ""
                            }`}
                        onClick={() => handleNavigation("/metrics", "metrics")}
                    >
                        <img src={metricsIcon} alt="" className="imagestyles" />
                        <span className="tooltip">Metrics</span>
                    </li>

                    <li
                        className={`d-flex justify-content-center align-items-center ${activeTab === "logout" ? "active-tab" : ""
                            }`}
                        onClick={handleLogout}
                    >
                        <img src={logoutIcon} alt="" className="imagestyles" />
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>
        </>
    );
}
