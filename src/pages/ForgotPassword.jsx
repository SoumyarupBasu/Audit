import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { forgotPassword as forgotPasswordAPI } from "../services/authService";
import "../styles/auth.css";

export default function ForgotPassword({ onNavigate, theme, onThemeToggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setEmailForVerification } = useAuth();

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
    setIsLoading(true);
    setErrorMessage("");

    try {
      await forgotPasswordAPI(formData.email);

      // Store email for reset password flow
      setEmailForVerification(formData.email);

      setSuccessMessage("OTP sent to your email. Please check your inbox.");

      // Navigate to reset password page
      setTimeout(() => {
        onNavigate("reset-password");
      }, 1500);
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
  );

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email address and we'll send you an OTP to reset your password"
      fields={fields}
      buttonText="SEND OTP"
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
