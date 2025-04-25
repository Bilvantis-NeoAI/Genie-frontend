
import React from "react";
import { Layout, Typography, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import BilvantisLogo from '../Assets/Bilvantis_logo.png';
import Neo from '../Assets/neoAI.png';

const { Header } = Layout;
const { Title } = Typography;

export function HeaderComponent() {
  const username = useSelector(state => state?.user?.username);
  const loading = useSelector(state => state?.user?.loading); // Add loading flag
console.log("====username",username);

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
        <img src={BilvantisLogo} alt="Bilvantis Logo" style={{ height: "30px" }} />
      </div>

      <Title
        style={{
          color: "Black",
          marginTop: '20px',
          textAlign: "center",
          flex: 2,
          fontSize: "16px",
        }}
      >
        <div>
          Welcome to
          <img src={Neo} alt="Neo Logo" style={{ height: "35px" }} />
        </div>
      </Title>

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
          <UserOutlined style={{ fontSize: '16px', color: "Black" }} />
        </div>

        {
          loading ? (
            <Skeleton.Input active size="small" style={{  width: "30px",
              height: "30px", 
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "8px" }} />
          ) : (
            <span style={{ color: "Black", fontSize: "14px" }}>
              {username || 'User'}
            </span>
          )
        }
      </div>
    </Header>
  );
}
