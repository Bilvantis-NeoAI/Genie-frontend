import React from "react";
import { Layout, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Title } = Typography;
export function HeaderComponent() {
    const username = localStorage.getItem("username") || "Admin";

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
            }}
        >
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            </div>
            <Title
                level={5}
                style={{
                    color: "Black",
                    marginTop: '20px',
                    textAlign: "center",
                    flex: 2,
                    fontSize: "16px",
                }}
            >
                <h4> Welcome to Genie</h4>
            </Title>
            <div style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "flex-end", marginRight: '20px' }}>
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
                <span style={{ color: "Black", fontSize: "14px" }}>
                    {username}
                </span>
            </div>
        </Header>
    );
};