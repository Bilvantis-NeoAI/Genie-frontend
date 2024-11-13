import React, { useState } from "react";
import barsimage from "../Assets/bars.svg";
import sideBarIcon1 from "../Assets/Sidenavimg1.svg";
import sideBarIcon2 from "../Assets/Sidenavimg2.svg";
import audiIcon from "../Assets/Sidenavimgaudio.svg";
import metricsIcon from "../Assets/Sidenavimgmetrics.svg";
import { useNavigate } from "react-router-dom";
import retriveData from '../Assets/retriveData.svg';
import injectingRepo from '../Assets/injectingRepo.svg';

export const BootstrapSidebar = () => {
  const navigate = useNavigate();
  const [showMetricsOptions, setShowMetricsOptions] = useState(false);

  const handleNavigation = (path, state = {}) => {
    navigate(path, { state });
  };

  const toggleMetricsDropdown = () => {
    setShowMetricsOptions((prevState) => !prevState);
  };

  return (
    <div className="sidebar">
      <ul className="nav-list m-0 p-0">
        <li className="d-flex justify-content-center align-items-center barli">
          <img src={barsimage} alt="" className="imagestyles" />
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/homepage')}>
          <img src={sideBarIcon1} alt="" className="imagestyles" />
          <span className="tooltip">Q&A</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/document')}>
          <img src={sideBarIcon2} alt="" className="imagestyles" />
          <span className="tooltip">Upload Document</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/audio')}>
          <img src={audiIcon} alt="" className="imagestyles" />
          <span className="tooltip">Audio AI</span>
        </li>

        {/* Metrics with tooltip arrow and dropdown */}
        <li className="d-flex justify-content-center align-items-center">
          <img src={metricsIcon} alt="" className="imagestyles" />
          <span className="tooltip" onClick={toggleMetricsDropdown}>
            Metrics <span className="arrow-down">{showMetricsOptions ? "▼" : "▲"}</span>
          </span>

          {showMetricsOptions && (
            <ul className="metrics-dropdown">
              <li onClick={() => handleNavigation('/metrics', { header: 'GIT repo metrics' })}>GIT repo metric</li>
              <li onClick={() => handleNavigation('/metrics', { header: 'Review code metrics' })}>Review code metric</li>
              <li onClick={() => handleNavigation('/metrics', { header: 'Code Assistance Metrics' })}>Code assistance metric</li>
            </ul>
          )}
        </li>

        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/kb')}>
          <img src={injectingRepo} alt="" className="imagestyles" />
          <span className="tooltip">Inject Repo</span>
        </li>
        <li className="d-flex justify-content-center align-items-center" onClick={() => handleNavigation('/retrivingData')}>
          <img src={retriveData} alt="" className="imagestyles" />
          <span className="tooltip">Retrieve Data</span>
        </li>
      </ul>
    </div>
  );
};
