import React, { useState } from "react";
import sideBarIcon1 from "../Assets/Sidenavimg1.svg";
import sideBarIcon2 from "../Assets/Sidenavimg2.svg";
import logoutIcon from "../Assets/logout.svg";
import metricsIcon from "../Assets/Sidenavimgmetrics.svg";
import admin from "../Assets/admin.svg"
import { useNavigate } from "react-router-dom";
import retriveData from '../Assets/retriveData.svg';
import injectingRepo from '../Assets/injectingRepo.svg';
import testai from '../Assets/testai.svg'
import gitMetric from '../Assets/gitMetric.svg'
import Swal from "sweetalert2";
import { sweetalert } from "../utils/constatnts";
import deadSpace from '../Assets/deadSpace.svg'
import gitreleaseIcon from '../Assets/gitRelease.svg'
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
          <img src={gitMetric} alt="" className="imagestyles" />
          <span className="tooltip">KBMS Metrics</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => {
          handleNavigation('/metrics')
        }}>
          <img src={metricsIcon} alt="" className="imagestyles" />
          <span className="tooltip"> GIT Metrics</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/homepage')}>
          <img src={sideBarIcon1} alt="" className="imagestyles" />
          <span className="tooltip">Q&A</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/document')}>
          <img src={sideBarIcon2} alt="" className="imagestyles" />
          <span className="tooltip">Upload Document</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/repoingestion')}>
          <img src={injectingRepo} alt="" className="imagestyles" />
          <span className="tooltip">GIT Ingestion</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/retrivingData')}>
          <img src={retriveData} alt="" className="imagestyles" />
          <span className="tooltip">GIT Q&A</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/testcases')}>
          <img src={testai} alt="" className="imagestyles" />
          <span className="tooltip">Test Cases</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/gitReleaseNote')}>
          <img src={gitreleaseIcon} alt="" className="imagestyles" />
          <span className="tooltip">GIT Release Note</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/deadCode')}>
          <img src={deadSpace} alt="" className="imagestyles" />
          <span className="tooltip">Dead Code</span>
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
