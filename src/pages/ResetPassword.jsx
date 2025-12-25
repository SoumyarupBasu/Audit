import { useState, useEffect } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import {
  resetPassword as resetPasswordAPI,
  resendOTP as resendOTPAPI,
} from "../services/authService";
import "../styles/auth.css";

export default function ResetPassword({ onNavigate, theme, onThemeToggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { getEmailForVerification, clearPendingEmail } = useAuth();

  const email = getEmailForVerification();

  // Redirect if no email is pending
  useEffect(() => {
    if (!email) {
      onNavigate("forgot-password");
    }
  }, [email, onNavigate]);

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

  // Validate password strength
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Field configurations
  const fields = [
    {
      name: "otp",
      label: "Verification Code",
      type: "text",
      placeholder: "Enter 6-digit OTP",
      icon: "key",
      required: true,
      maxLength: 6,
      autoComplete: "one-time-code",
      helperText: `OTP sent to ${email}`,
      validate: (value) => {
        if (!value) return "OTP is required";
        if (!/^\d{6}$/.test(value)) return "OTP must be 6 digits";
        return "";
      },
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      placeholder: "Enter new password",
      icon: "lock",
      required: true,
      autoComplete: "new-password",
      helperText:
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
      validate: (value) => {
        if (!value) return "New password is required";
        if (!validatePassword(value)) {
          return "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
        }
        return "";
      },
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm new password",
      icon: "lock",
      required: true,
      autoComplete: "new-password",
      validate: (value, formData) => {
        if (!value) return "Please confirm your password";
        if (value !== formData.newPassword) return "Passwords do not match";
        return "";
      },
    },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
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
        onNavigate("login");
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

  // Handle back to login
  const handleBackToLogin = () => {
    clearPendingEmail();
    onNavigate("login");
  };

  // Footer content with resend link
  const footerContent = (
    <div style={{ textAlign: "center" }}>
      <div
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
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleResendOTP()}
          >
            Resend OTP
          </a>
        )}
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the OTP sent to your email and create a new password"
      fields={fields}
      buttonText="RESET PASSWORD"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successMessage}
      footerContent={footerContent}
      backLink={{ text: "Back to Login", onClick: handleBackToLogin }}
      theme={theme}
      onThemeToggle={onThemeToggle}
    />
  );
}
