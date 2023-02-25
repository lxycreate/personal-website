import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import Logo from "@assets/icon/logo.svg";
import "./layout.less";

const { Header, Sider, Content } = Layout;

const menus = [
    {
        key: "HTML",
        label: "HTML",
    },
    {
        key: "CSS",
        label: "CSS",
    },
    {
        key: "JavaScript",
        label: "JavaScript",
    },
];
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
            >
                <div className="logo">
                    <img src={Logo} className="logo-img" />
                    前端
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    items={menus}
                />
            </Header>

            <Layout className="site-layout">
                <Content
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
