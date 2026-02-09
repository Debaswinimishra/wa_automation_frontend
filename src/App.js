import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import TopNavMenu from "./Component/TopNavMenu";
import Login from "./Pages/Login";
import QrPage from "./Pages/QrPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthGuard isLoggedIn={isLoggedIn}>
              <Login setIsLoggedIn={handleLogin} />
            </AuthGuard>
          }
        />

        <Route
          path="/qr"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout onLogout={handleLogout}>
                <QrPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/qr" replace />} />
      </Routes>
    </Router>
  );
};

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AuthGuard = ({ children, isLoggedIn }) => {
  if (isLoggedIn) {
    return <Navigate to="/qr" replace />;
  }

  return children;
};

const MainLayout = ({ children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/qr", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleBackButton = (e) => {
      if (location.pathname === "/qr") {
        e.preventDefault();
        window.history.forward();
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location]);

  return (
    <>
      <TopNavMenu onLogout={onLogout} />
      {children}
    </>
  );
};

export default App;
