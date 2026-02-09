import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TopNavMenu from "./Component/TopNavMenu";
import Login from "./Pages/Login";
import QrPage from "./Pages/QrPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  return (
    <Router>
      {isLoggedIn && <TopNavMenu />}

      <Routes>
        <Route
          path="/login"
          element={
            // isLoggedIn ? (
            //   <Navigate to="/qr" />
            // ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
          //   )
          }
        />

        <Route
          path="/qr"
          element={isLoggedIn ? <QrPage /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
