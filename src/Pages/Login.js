import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (userId === "admin" && password === "admin123") {
      setIsLoggedIn();
      setError("");
    } else {
      setError("Invalid User ID or Password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
          />
        </div>

        <div className="input-group">
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

const styles = `
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 32px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.login-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.login-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
}

.password-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
}

.password-toggle:hover {
  background: #f0f0f0;
}

.error-message {
  margin: 0 0 16px 0;
  color: #e53935;
  font-size: 14px;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-button:hover {
  background: #3a80d2;
}

.login-button:active {
  transform: scale(0.98);
}

@media (max-width: 480px) {
  .login-container {
    padding: 16px;
    background: white;
  }
  
  .login-card {
    padding: 24px 16px;
    box-shadow: none;
  }
  
  .login-title {
    font-size: 22px;
    margin-bottom: 20px;
  }
  
  .login-input {
    padding: 10px;
    font-size: 15px;
  }
  
  .login-button {
    padding: 10px;
    font-size: 15px;
  }
}

@media (max-width: 320px) {
  .login-card {
    padding: 20px 12px;
  }
  
  .login-title {
    font-size: 20px;
  }
  
  .login-input {
    padding: 8px;
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Login;
