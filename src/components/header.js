import React from "react";
import { Layout, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons'; // Import User icon from Ant Design
 import BilvantisLogo from '../Assets/Bilvantis_logo.png'
 import Neo from '../Assets/neoAI.png'
 
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
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <img
            src={BilvantisLogo}
            alt="Bilvantis Logo"
            style={{ height: "30px" }} // Adjust logo height if needed
          />
      </div>
 
      <Title
        // level={5}
        style={{
          color: "Black",
          marginTop: '20px',
          textAlign: "center",
          flex: 2, // Allow the title to take more space in the center
          fontSize: "16px",
        }}
      >
      <div> Welcome to  <img
            src={Neo}
            alt="Bilvantis Logo"
            style={{ height: "35px" }} // Adjust logo height if needed
          /></div>
      
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