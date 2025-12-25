import { useState, useEffect } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import {
  verifyOTP as verifyOTPAPI,
  resendOTP as resendOTPAPI,
} from "../services/authService";
import "../styles/auth.css";

export default function VerifyOTP({
  onNavigate,
  theme,
  onThemeToggle,
  onVerifySuccess,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { getEmailForVerification, clearPendingEmail, login } = useAuth();

  const email = getEmailForVerification();

  // Redirect if no email is pending verification
  useEffect(() => {
    if (!email) {
      onNavigate("login");
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

  // Field configurations
  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Your email address",
      icon: "mail",
      required: true,
      defaultValue: email,
      autoComplete: "email",
      validate: (value) => {
        if (!value) return "Email is required";
        return "";
      },
    },
    {
      name: "otp",
      label: "Verification Code",
      type: "text",
      placeholder: "Enter 6-digit OTP",
      icon: "key",
      required: true,
      maxLength: 6,
      autoComplete: "one-time-code",
      helperText: "Enter the 6-digit code sent to your email",
      validate: (value) => {
        if (!value) return "OTP is required";
        if (!/^\d{6}$/.test(value)) return "OTP must be 6 digits";
        return "";
      },
    },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
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

      // Navigate to login or dashboard
      setTimeout(() => {
        if (onVerifySuccess) {
          onVerifySuccess(response);
        } else {
          onNavigate("login");
        }
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

  // Handle login click
  const handleLogin = () => {
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
          marginBottom: "var(--spacing-sm)",
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
      title="Verify Your Email"
      subtitle="Enter the verification code sent to your email"
      fields={fields}
      buttonText="VERIFY"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successMessage}
      footerContent={footerContent}
      backLink={{ text: "Back to Login", onClick: handleLogin }}
      theme={theme}
      onThemeToggle={onThemeToggle}
    />
  );
}
