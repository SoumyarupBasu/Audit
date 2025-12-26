import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { forgotPassword as forgotPasswordAPI } from "../services/authService";
import Icon from "../components/Icon";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setEmailForVerification } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await forgotPasswordAPI(formData.email);

      // Store email for reset password flow
      setEmailForVerification(formData.email);

      setSuccessMessage("OTP sent to your email. Please check your inbox.");

      // Navigate to reset password page
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Form Header */}
      <div className="auth-form-header">
        <h2 className="auth-form-title">Forgot Password?</h2>
        <p className="auth-form-description">
          Enter your email address and we'll send you an OTP to reset your
          password
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="auth-message success">
          <Icon name="check-circle" size="18px" />
          <span>{successMessage}</span>
        </div>
      )}

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

        <button
          type="submit"
          className={`auth-button ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : "SEND OTP"}
        </button>

        <div className="auth-footer">
          <div
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--text-secondary)",
            }}
          >
            Remember your password?{" "}
            <a
              className="auth-link"
              onClick={() => navigate("/login")}
              role="button"
            >
              Login here
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
