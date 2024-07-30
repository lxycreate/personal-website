import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet, NavLink, useMatches } from "react-router-dom";
import Logo from "@assets/icon/logo.svg";
import "./layout.less";

const { Header, Sider, Content } = Layout;

interface RouteMenu {
    path: string;
    label: string;
}
const menus = [
    {
        path: "/tools",
        label: "格式化",
    },
    {
        path: "/remove",
        label: "删列",
    },
    // {
    //     path: "/css",
    //     label: "CSS",
    // },
    // {
    //     path: "/javascript",
    //     label: "JavaScript",
    // },
];

const secondMenus: { [key: string]: RouteMenu[] } = {
    "/html": [
        {
            path: "/html/default",
            label: "HTML",
        },
    ],
    "/css": [
        {
            path: "/css/default",
            label: "CSS",
        },
    ],
    "/javascript": [
        {
            path: "/javascript/default",
            label: "JavaScript",
        },
    ],
};
const App: React.FC = () => {
    const matches = useMatches(),
        current = menus.find((v) => matches.find((t) => t.pathname === v.path));
    const [sMenus, setSMenus] = useState(
        ((current && secondMenus[current.path]) || []) as RouteMenu[]
    );
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
                    {/* 前端 */}
                </div>
                {menus.map((m) => (
                    <NavLink
                        className="nav-link"
                        to={m.path}
                        key={m.path}
                        onClick={() => setSMenus(secondMenus[m.path] || [])}
                    >
                        {m.label}
                    </NavLink>
                ))}
            </Header>
            <Content>
                <Layout
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {/* <Sider
                        className="sider"
                        style={{
                            paddingTop: "20px",
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        {sMenus.map((v) => (
                            <NavLink
                                key={v.path}
                                className="s-nav-link"
                                to={v.path}
                            >
                                {v.label}
                            </NavLink>
                        ))}
                    </Sider> */}
                    <Content style={{ paddingLeft: "20px" }}>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default App;
