import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Button, Drawer } from "antd";
import {
  AuditOutlined,
  MailOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import logo from "../assets/tzicon.png";

const TopNavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    setCurrent(location.pathname);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  const handleClick = (e) => {
    // 🔐 Logout logic
    if (e.key === "/logout") {
      localStorage.removeItem("isLoggedIn");
      setDrawerVisible(false);
      navigate("/login");
      
      return;
    }

    setCurrent(e.key);
    navigate(e.key);
    if (isMobile) setDrawerVisible(false);
  };

  /* ===================== Styles ===================== */

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(0, 21, 41)",
    padding: "10px 20px",
    borderBottom: "2px solid #4caf50",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoContainerStyles = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const logoStyles = {
    height: "40px",
    marginRight: "10px",
  };

  const titleStyles = {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    background: "linear-gradient(90deg, #ffffff, #4caf50)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const menuStyles = {
    flex: 1,
    display: isMobile ? "none" : "flex",
    justifyContent: "flex-end",
    background: "transparent",
    border: "none",
  };

  const itemStyles = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#ffffff",
    margin: "0 10px",
  };

  const drawerButtonStyles = {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
    color: "#ffffff",
  };

  const drawerBodyStyles = {
    background: "#001529",
    padding: 0,
  };

  /* ===================== Menu Items ===================== */

  const items = [
    {
      label: (
        <span style={itemStyles}>
          <AuditOutlined /> QR
        </span>
      ),
      key: "/HomePage",
    },
    {
      label: (
        <span style={itemStyles}>
          <MailOutlined /> Messages
        </span>
      ),
      key: "/SendMessage",
    },
    {
      label: (
        <span style={itemStyles}>
          <LogoutOutlined /> Logout
        </span>
      ),
      key: "/logout",
    },
  ];

  return (
    <div style={containerStyles}>
      {/* Logo */}
      <div style={logoContainerStyles} onClick={() => navigate("/HomePage")}>
        <img src={logo} alt="Logo" style={logoStyles} />
        <h1 style={titleStyles}>TZ - Group Management</h1>
      </div>

      {/* Desktop Menu */}
      {!isMobile ? (
        <Menu
          items={items}
          onClick={handleClick}
          mode="horizontal"
          theme="dark"
          selectedKeys={[current]}
          style={menuStyles}
        />
      ) : (
        <>
          {/* Mobile Menu Button */}
          <Button
            icon={<MenuOutlined />}
            style={drawerButtonStyles}
            onClick={() => setDrawerVisible(true)}
          />

          {/* Mobile Drawer */}
          <Drawer
            title={<span style={{ color: "#fff" }}>Menu</span>}
            placement="right"
            open={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            bodyStyle={drawerBodyStyles}
            headerStyle={{ background: "#001529" }}
          >
            <Menu
              items={items}
              onClick={handleClick}
              mode="vertical"
              theme="dark"
              selectedKeys={[current]}
            />
          </Drawer>
        </>
      )}
    </div>
  );
};

export default TopNavMenu;
