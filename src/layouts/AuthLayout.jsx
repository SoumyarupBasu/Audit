import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Icon from "../components/Icon";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ResendOTP from "../pages/ResendOTP";
import "../styles/auth.css";

/**
 * Simple Authentication Layout Component
 * Provides consistent layout and handles route-based form selection
 */
export default function AuthLayout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Route ke basis pe component decide karte hain
  const renderAuthForm = () => {
    switch (location.pathname) {
      case "/login":
        return <Login />;
      case "/register":
        return <Register />;
      case "/verify-otp":
        return <VerifyOTP />;
      case "/forgot-password":
        return <ForgotPassword />;
      case "/reset-password":
        return <ResetPassword />;
      case "/resend-otp":
        return <ResendOTP />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="auth-container">
      {/* Theme Toggle Button */}
      <button
        className="auth-theme-toggle"
        onClick={toggleTheme}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <Icon name={theme === "light" ? "moon" : "sun"} size="20px" />
      </button>

      {/* Left Side - Visual/Branding Section */}
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-logo-large">
            <div className="auth-logo-icon-large">
              <Icon name="shield" size="64px" style={{ color: "white" }} />
            </div>
          </div>
          <h1 className="auth-visual-title">CYPHER SENTINEL</h1>
          <p className="auth-visual-subtitle">
            AI-Powered Compliance Auditing Platform
          </p>

          <div className="auth-visual-features">
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="check-circle" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Automated Compliance</h3>
                <p>Streamline your audit processes with AI</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="shield" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Multi-Framework Support</h3>
                <p>ISO 27001, NIST, SOX, GDPR & more</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="chart" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Real-Time Insights</h3>
                <p>Monitor compliance status instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-form-section">
        <div className="auth-form-container">{renderAuthForm()}</div>
      </div>
    </div>
  );
}
