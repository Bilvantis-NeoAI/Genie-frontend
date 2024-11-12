import React from "react";
import barsimage from "../Assets/bars.svg";
import sideBarIcon1 from "../Assets/Sidenavimg1.svg";
import sideBarIcon2 from "../Assets/Sidenavimg2.svg";
import audiIcon from "../Assets/Sidenavimgaudio.svg"
import sideBarIcon4 from "../Assets/Sidenavimg4.svg";
import metricsIcon from "../Assets/Sidenavimgmetrics.svg"
import { useNavigate } from "react-router-dom";
import retriveData from '../Assets/retriveData.svg'
import injectingRepo from '../Assets/injectingRepo.svg'
export const BootstrapSidebar = () => {
  const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
      };

    return (
      <div className="sidebar">
        <ul className="nav-list m-0 p-0">
          <li className="d-flex justify-content-center align-items-center barli">
            <img src={barsimage} alt="" className="imagestyles" />
          </li>
          <li
            className="d-flex justify-content-center align-items-center" onClick={()=>handleNavigation('/homepage')}>
            <img src={sideBarIcon1} alt="" className="imagestyles" />
            <span className="tooltip">Q&A</span>
          </li>
          <li
            className=" d-flex justify-content-center align-items-center" onClick={()=>handleNavigation('/document')}>
            <img src={sideBarIcon2} alt="" className="imagestyles" />
            <span className="tooltip">Upload Document</span>
          </li>
          <li
            className=" d-flex justify-content-center align-items-center" onClick={()=>handleNavigation('/audio')}>
            <img src={audiIcon} alt="" className="imagestyles" />
            <span className="tooltip">Audio AI</span>
          </li>
          <li
            className=" d-flex justify-content-center align-items-center" onClick={()=>handleNavigation('/metrics')}>
            <img src={metricsIcon} alt="" className="imagestyles"/>
            <span className="tooltip">Metrics</span>
          </li>
          <li
            className=" d-flex justify-content-center align-items-center" onClick={()=>handleNavigation('/kb')}>
            <img src={injectingRepo} alt="" className="imagestyles"/>
            <span className="tooltip">Injecting Repo</span>
          </li>
          <li
            className=" d-flex justify-content-center align-items-center" onClick={()=>handleNavigation('/retrivingData')}>
            <img src={retriveData} alt="" className="imagestyles"/>
            <span className="tooltip">Retrive data</span>
          </li>
        </ul>
      </div>
    );
  };
  