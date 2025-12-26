import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  resetPassword as resetPasswordAPI,
  resendOTP as resendOTPAPI,
} from "../services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResendOtpLoading, setIsResendOtpLoading] = useState(false);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordAPI({
        email,
        otp: formData.otp,
        password: formData.newPassword,
      });

      // Clear pending email
      clearPendingEmail();

      toast.success(
        response.message || "Password reset successful! Redirecting to login..."
      );

      // Navigate to login
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      console.error(
        error.message || "Failed to reset password. Please try again."
      );
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setIsResendOtpLoading(true);

    try {
      const response = await resendOTPAPI(email);
      toast.success(
        response.message || "A new OTP has been sent to your email."
      );
      setResendCooldown(60);
    } catch (error) {
      console.error(error.message || "Failed to resend OTP. Please try again.");
      toast.error(error.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsResendOtpLoading(false);
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

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
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
          <small className="form-helper-text">OTP sent to {email}</small>
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <div className="input-wrapper">
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
                <Link
                  className="auth-link"
                  onClick={handleResendOTP}
                  role="button"
                >
                  {isResendOtpLoading ? "Resending..." : "Resend OTP"}
                </Link>
              )}
            </span>
          </div>
          <Link to={"/login"} className="auth-link" role="button">
            Back to Login
          </Link>
          <Link
            to={"/forgot-password"}
            className="auth-link"
            role="button"
            style={{ marginLeft: "2rem" }}
          >
            Back to Forgot Password
          </Link>
        </div>
      </form>
    </>
  );
}
