import React from "react";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/tzicon.png";

const TopNavMenu = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMessagesClick = () => {
    message.info("Module is under development");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logoImage} />
        <div style={styles.logoText}>WhatsApp Manager</div>
      </div>

      <div style={styles.menuItems}>
        <div
          style={{
            ...styles.menuItem,
            ...(isActive("/qr") ? styles.activeItem : {}),
          }}
          onClick={() => navigate("/qr")}
        >
          QR
        </div>

        <div style={styles.menuItem} onClick={handleMessagesClick}>
          Messages
        </div>

        <div style={styles.menuItem} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    height: "60px",
    backgroundColor: "#002503ff",
    color: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "default",
    userSelect: "none",
  },
  logoImage: {
    width: "32px",
    height: "32px",
    objectFit: "contain",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "600",
  },
  menuItems: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  menuItem: {
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "14px",
  },
  activeItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottom: "2px solid #2bff18ff",
  },
};

export default TopNavMenu;
