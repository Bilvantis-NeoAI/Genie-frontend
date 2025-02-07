import React from "react";
import { Layout, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Title } = Typography;
export function HeaderComponent() {
    const username = localStorage.getItem("username") || "Admin";
    return (
        <Header
            className="header">
               <div className="title"> Welcome to Genie</div>
            <div className ="profile">
                <div className='profile-image'>
                    <UserOutlined/>
                </div>
                <span className="profile-name">
                    {username}
                </span>
            </div>
        </Header>
    );
};