import React, { useState } from "react";
import logoutIcon from "../Assets/logout.svg";
import admin from "../Assets/admin.svg"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sweetalert } from "../utils/constatnts";
import gitIcon from '../Assets/git.svg'
import ragIcon from '../Assets/rag.svg'
import testai from '../Assets/testgen.svg'
import metrics from '../Assets/metrics.svg'
export const BootstrapSidebar = () => {
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
    <div className="sidebar">
      <ul className="nav-list m-0 p-0">
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/gitmetrics')}>
          <img src={ragIcon} alt="" className="imagestyles"  style={{height:'40px' , width:'30px', marginTop:'20px'}}/>
          <span className="tooltip">RAG</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => {
          handleNavigation('/metrics')
        }}>
          <img src={metrics} alt="" className="imagestyles" />
          <span className="tooltip"> Metrics</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/gitoprations')}>
          <img src={gitIcon} alt="" className="imagestyles" />
          <span className="tooltip">Repo Operations</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/testcases')}>
          <img src={testai} alt="" className="imagestyles" />
          <span className="tooltip">Test Gen</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/adminDashBoard')}>
          <img src={admin} alt="" className="imagestyles" />
          <span className="tooltip">Admin</span>
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
  );
};
