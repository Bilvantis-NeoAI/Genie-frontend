import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import logoutIcon from "../Assets/logout.svg";
import admin from "../Assets/admin.svg";
import gitIcon from "../Assets/git.svg";
import ragIcon from "../Assets/rag.svg";
import testai from "../Assets/testgen.svg";
import metrics from "../Assets/metrics.svg";
import { sweetalert } from "../utils/constatnts";

export const BootstrapSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "metrics");
  const appGcp = process.env.REACT_APP_IP;
  const appAws = process.env.REACT_APP_AWS;
  const handleNavigation = (path, tabName) => {
    setActiveTab(tabName);
    navigate(path, { state: { activeTab: tabName } });
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

  const iconStyle = {
    width: "25px",
    height: "25px",
  };

  let sidebarItems;
  if (appGcp === "http://34.60.74.140/") {
    sidebarItems = [
      { path: "/metrics", icon: metrics, label: "Metrics", name: "metrics" },
      { path: "/gitmetrics", icon: ragIcon, label: "RAG", name: "rag" },
      { path: "/gitoprations", icon: gitIcon, label: "Repo Operations", name: "git" },
      { path: "/testcases", icon: testai, label: "Test Gen", name: "test" },
      { path: "/adminDashBoard", icon: admin, label: "Admin", name: "admin" }
    ];
  } else if (appAws === "http://a3d912cc045fb44fb9a8936bc02adc3a-1147441363.ap-south-1.elb.amazonaws.com/") {
    sidebarItems = [
      { path: "/gitmetrics", icon: ragIcon, label: "RAG", name: "rag" },
    ];
  } else {
    sidebarItems = [
      { path: "/metrics", icon: metrics, label: "Metrics", name: "metrics" },
      { path: "/gitmetrics", icon: ragIcon, label: "RAG", name: "rag" },
      { path: "/gitoprations", icon: gitIcon, label: "Repo Operations", name: "git" },
      { path: "/testcases", icon: testai, label: "Test Gen", name: "test" },
      { path: "/adminDashBoard", icon: admin, label: "Admin", name: "admin" }
    ];
  }

  return (
    <div className="sidebar">
      <ul className="nav-list m-0 p-0">
        {[
          { path: "/metrics", icon: metrics, label: "Metrics", name: "metrics" },
          { path: "/gitmetrics", icon: ragIcon, label: "RAG", name: "rag" },
          { path: "/gitoprations", icon: gitIcon, label: "Repo Operations", name: "git" },
          { path: "/testcases", icon: testai, label: "Test Gen", name: "test" },
          { path: "/adminDashBoard", icon: admin, label: "Admin", name: "admin" }
        ].map(({ path, icon, label, name }) => (
          <li
            key={name}
            className="d-flex justify-content-center align-items-center"
            onClick={() => handleNavigation(path, name)}
            style={{
              backgroundColor: activeTab === name ? "#00BDD0" : "transparent",
              color: activeTab === name ? "white" : "black",
              cursor: "pointer"
            }}
          >
            <img src={icon} alt="" style={iconStyle} />
            <span className="tooltip" style={{ marginLeft: "10px" }}>{label}</span>
          </li>
        ))}

        {appGcp === "http://34.60.74.140/" && (
          <li
            className="d-flex justify-content-center align-items-center"
            onClick={handleLogout}
            style={{
              backgroundColor: activeTab === "logout" ? "#00BDD0" : "transparent",
              color: activeTab === "logout" ? "white" : "black",
              cursor: "pointer"
            }}
          >
            <img src={logoutIcon} alt="" style={iconStyle} />
            <span className="tooltip" style={{ marginLeft: "10px" }}>Logout</span>
          </li>
        )}
      </ul>
    </div>
  );
};
