// import { headerTextSamples } from "../utils/constatnts"

// export function Header() {
//     return (<>
//         <div className="w-100 h-100 d-flex justify-content-center align-items-center header-style">
//             <span className="header-text">{headerTextSamples.SOLAR_WINDS}</span>
//         </div>

//     </>
//     )
// }

import React from "react";
import { Layout, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons'; // Import User icon from Ant Design
 
const { Header } = Layout;
const { Title } = Typography;
 
export function HeaderComponent() {
  const username = localStorage.getItem("username") || "Guest"; // Fallback to "Guest" if not found
 
  return (
    <Header
      className="header"
      style={{
        display: "flex",
        alignItems: "center",
        height: "50px",
        position: "relative",
        backgroundColor: "white",
        borderBottom: "1px solid #dcdcdc",
        padding: "0 10px",
      }}
    >
      {/* Left Section: Logo */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <img
            src="https://bilvantis.io/wp-content/uploads/2022/12/Bilvantis-logo-png.jpg"
            alt="Bilvantis Logo"
            style={{ height: "30px" }} // Adjust logo height if needed
          />
        </a>
      </div>
 
      {/* Center Section: Title */}
      <Title
        level={5}
        style={{
          color: "Black",
          marginTop: '20px',
          textAlign: "center",
          flex: 2, // Allow the title to take more space in the center
          fontSize: "16px",
        }}
      >
      <h4> Welcome to Genie</h4>
      </Title>
 
      {/* Right Section: Profile Icon and Username */}
      <div style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "flex-end" }}>
        <div style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "8px",
        }}>
          <UserOutlined style={{ fontSize: '16px', color: "Black" }} /> {/* Profile icon */}
        </div>
        <span style={{ color: "Black", fontSize: "14px" }}>
          {username}
        </span>
      </div>
    </Header>
  );
};
 