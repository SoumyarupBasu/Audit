import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  resetPassword as resetPasswordAPI,
  resendOTP as resendOTPAPI,
} from "../services/authService";
import Icon from "../components/Icon";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { getEmailForVerification, clearPendingEmail } = useAuth();

  const email = getEmailForVerification();

  // Redirect if no email is pending
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await resetPasswordAPI(
        email,
        formData.otp,
        formData.newPassword,
        formData.confirmPassword
      );

      // Clear pending email
      clearPendingEmail();

      setSuccessMessage("Password reset successful! Redirecting to login...");

      // Navigate to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    try {
      await resendOTPAPI(email);
      setSuccessMessage("A new OTP has been sent to your email.");
      setResendCooldown(60);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <>
      {/* Form Header */}
      <div className="auth-form-header">
        <h2 className="auth-form-title">Reset Password</h2>
        <p className="auth-form-description">
          Enter the OTP sent to your email and create a new password
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
          <label className="form-label">Verification Code</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <Icon name="key" size="20px" />
            </div>
            <input
              type="text"
              name="otp"
              className="form-input"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              maxLength={6}
              required
            />
          </div>
          <small className="form-helper-text">OTP sent to {email}</small>
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <Icon name="lock" size="20px" />
            </div>
            <input
              type="password"
              name="newPassword"
              className="form-input"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <small className="form-helper-text">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <Icon name="lock" size="20px" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
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
          {isLoading ? "Resetting..." : "RESET PASSWORD"}
        </button>

        <div className="auth-footer">
          <div
            style={{ textAlign: "center", marginBottom: "var(--spacing-md)" }}
          >
            <span
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--text-secondary)",
              }}
            >
              Didn't receive the code?{" "}
              {resendCooldown > 0 ? (
                <span style={{ color: "var(--text-muted)" }}>
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <a
                  className="auth-link"
                  onClick={handleResendOTP}
                  role="button"
                >
                  Resend OTP
                </a>
              )}
            </span>
          </div>
          <a
            className="auth-link"
            onClick={() => {
              clearPendingEmail();
              navigate("/login");
            }}
            role="button"
          >
            Back to Login
          </a>
        </div>
      </form>
    </>
  );
}
