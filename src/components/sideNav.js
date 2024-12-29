// import { useNavigate } from "react-router-dom";
// import metricsIcon from "../Assets/Sidenavimgmetrics.svg";
// import adminIcon from '../Assets/admin.svg'
// import logoutIcon from '../Assets/logout.svg'
// import { useState } from "react";
// import Swal from "sweetalert2";
// export default function SideNav() {
//     const navigate = useNavigate();
//     const [logout, setLogOut] = useState(false)
//     const handleNavigation = (path, state = {}) => {
//         navigate(path, { state });
//     };
//     const handleSubmit = (e) => {
//         setLogOut(true)
//         Swal.fire({
//             title: 'Warning',
//             text: 'Are you sure you want logout',
//             icon: 'warning',
//         }).then((d) => {
//             handleNavigation('/')
//         });

//     }
//     return (<>
//         <div className="sidebar">
//             <ul className="nav-list m-0 p-0">
//                 <li className="d-flex justify-content-center align-items-center Iconstyles" onClick={() => {
//                     handleNavigation('/metrics')
//                 }}>
//                     <img src={metricsIcon} alt="" className="imagestyles" />
//                     <span className="tooltip">Metrics</span>
//                 </li>
//                 <li className="d-flex justify-content-center align-items-center" onClick={handleSubmit}>
//                     <img src={logoutIcon} alt="" className="imagestyles" />
//                     <span className="tooltip">
//                         Logout
//                     </span>
//                 </li>
//             </ul>
//         </div>
//     </>)
// }


import { useNavigate } from "react-router-dom";
import metricsIcon from "../Assets/Sidenavimgmetrics.svg";
import adminIcon from "../Assets/admin.svg";
import logoutIcon from "../Assets/logout.svg";
import { useState } from "react";
import Swal from "sweetalert2";

export default function SideNav() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("metrics"); // Track the active tab

    const handleNavigation = (path, tabName, state = {}) => {
        setActiveTab(tabName); // Set the active tab
        navigate(path, { state });
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Warning",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true, // Add Cancel button
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setActiveTab(""); // Clear active tab
                navigate("/"); // Navigate to logout route
            }
        });
    };

    return (
        <>
            <div className="sidebar">
                <ul className="nav-list m-0 p-0">
                    {/* Metrics Tab */}
                    <li
                        className={`d-flex justify-content-center align-items-center Iconstyles ${
                            activeTab === "metrics" ? "active-tab" : ""
                        }`}
                        onClick={() => handleNavigation("/metrics", "metrics")}
                    >
                        <img src={metricsIcon} alt="" className="imagestyles" />
                        <span className="tooltip">Metrics</span>
                    </li>

                    {/* Logout Tab */}
                    <li
                        className={`d-flex justify-content-center align-items-center Iconstyles ${
                            activeTab === "logout" ? "active-tab" : ""
                        }`}
                        onClick={handleLogout}
                    >
                        <img src={logoutIcon} alt="" className="imagestyles"/>
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>
        </>
    );
}
