import { useState, useEffect } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { resendOTP as resendOTPAPI } from "../services/authService";
import "../styles/auth.css";

export default function ResendOTP({ onNavigate, theme, onThemeToggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const { getEmailForVerification, setEmailForVerification } = useAuth();

  const storedEmail = getEmailForVerification();

  // Countdown timer for cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Field configurations
  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
      icon: "mail",
      required: true,
      defaultValue: storedEmail,
      autoComplete: "email",
      validate: (value) => {
        if (!value) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        return "";
      },
    },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
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
        onNavigate("verify-otp");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to login
  const handleBackToLogin = () => {
    onNavigate("login");
  };

  // Footer content
  const footerContent = (
    <div style={{ textAlign: "center" }}>
      {cooldown > 0 && (
        <div
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-muted)",
            marginBottom: "var(--spacing-sm)",
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
          onClick={handleBackToLogin}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && handleBackToLogin()}
        >
          Login here
        </a>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Resend OTP"
      subtitle="Enter your email address to receive a new verification code"
      fields={fields}
      buttonText={cooldown > 0 ? `WAIT ${cooldown}s` : "SEND OTP"}
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
