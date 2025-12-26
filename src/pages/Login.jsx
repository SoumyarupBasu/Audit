import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as loginAPI } from "../services/authService";
import Icon from "../components/Icon";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await loginAPI(formData.email, formData.password);
      login(response.user, response.token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Form Header */}
      <div className="auth-form-header">
        <h2 className="auth-form-title">Welcome Back</h2>
        <p className="auth-form-description">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="auth-message error">
          <Icon name="warning" size="18px" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`auth-button ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "LOGIN"}
        </button>

        <div className="auth-footer">
          <a
            className="auth-link"
            onClick={() => navigate("/forgot-password")}
            role="button"
          >
            Forgot password?
          </a>
          <div
            style={{
              marginTop: "var(--spacing-lg)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Don't have an account?{" "}
            <a
              className="auth-link"
              onClick={() => navigate("/register")}
              role="button"
            >
              Register here
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
