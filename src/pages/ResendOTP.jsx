import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { resendOTP as resendOTPAPI } from "../services/authService";
import Icon from "../components/Icon";

export default function ResendOTP() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const { getEmailForVerification, setEmailForVerification } = useAuth();

  const storedEmail = getEmailForVerification();

  // Set stored email in form data
  useEffect(() => {
    if (storedEmail) {
      setFormData({ email: storedEmail });
    }
  }, [storedEmail]);

  // Countdown timer for cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldown > 0) {
      setErrorMessage(
        `Please wait ${cooldown} seconds before requesting again.`
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await resendOTPAPI(formData.email);

      // Store email for verification
      setEmailForVerification(formData.email);

      setSuccessMessage("OTP sent successfully! Check your email.");
      setCooldown(60); // 60 second cooldown

      // Navigate to verify OTP after a short delay
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
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
        <h2 className="auth-form-title">Resend OTP</h2>
        <p className="auth-form-description">
          Enter your email address to receive a new verification code
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
            <div className="input-icon">
              <Icon name="mail" size="20px" />
            </div>
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
          disabled={isLoading || cooldown > 0}
        >
          {cooldown > 0
            ? `WAIT ${cooldown}s`
            : isLoading
            ? "Sending..."
            : "SEND OTP"}
        </button>

        <div className="auth-footer">
          {cooldown > 0 && (
            <div
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--text-muted)",
                marginBottom: "var(--spacing-sm)",
                textAlign: "center",
              }}
            >
              You can request again in {cooldown} seconds
            </div>
          )}
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
