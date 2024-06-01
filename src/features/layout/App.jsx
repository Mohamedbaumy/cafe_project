import React, { useState } from "react";
import { Layout, theme, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import SidebarList from "./SidebarList";
import useStore from "@/store";
import ThemeButton from "@/components/page/ThemeButton";

const { Header, Sider, Content } = Layout;
const App = () => {
  const { darkMode } = useStore();
  const [collapsed, setCollapsed] = useState(true);

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgBase: darkMode
            ? "rgb(15 23 42 / var(--tw-bg-opacity))"
            : "#fff",
        },
      }}
      direction="rtl"
    >
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <div className="demo-logo-vertical" />
          <SidebarList />
        </Sider>
        <Layout>
          <Header
            className="bg-white dark:bg-[#1a2748]"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            NBC
            <ThemeButton />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default App;
