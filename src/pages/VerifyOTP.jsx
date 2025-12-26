import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  verifyOTP as verifyOTPAPI,
  resendOTP as resendOTPAPI,
} from "../services/authService";
import Icon from "../components/Icon";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { getEmailForVerification, clearPendingEmail, login } = useAuth();

  const email = getEmailForVerification();

  // Set email in form data and redirect if no email is pending verification
  useEffect(() => {
    if (!email) {
      navigate("/login");
    } else {
      setFormData((prev) => ({ ...prev, email }));
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
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await verifyOTPAPI(formData.email, formData.otp);

      // Clear pending email
      clearPendingEmail();

      // If response includes user and token, log them in
      if (response.user && response.token) {
        login(response.user, response.token);
      }

      setSuccessMessage("Email verified successfully!");

      // Navigate to dashboard or login
      setTimeout(() => {
        navigate(response.user ? "/dashboard" : "/login");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || "Invalid OTP. Please try again.");
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
      setResendCooldown(60); // 60 second cooldown
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
        <h2 className="auth-form-title">Verify Your Email</h2>
        <p className="auth-form-description">
          Enter the verification code sent to your email
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
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Verification Code</label>
          <div className="input-wrapper">
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
          <small className="form-helper-text">
            Enter the 6-digit code sent to your email
          </small>
        </div>

        <button
          type="submit"
          className={`auth-button ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "VERIFY"}
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
