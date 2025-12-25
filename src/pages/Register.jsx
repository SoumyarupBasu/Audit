import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { register as registerAPI } from "../services/authService";
import "../styles/auth.css";

export default function Register({ onNavigate, theme, onThemeToggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setEmailForVerification } = useAuth();

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ""));
  };

  // Validate password strength
  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Field configurations
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: "user",
      required: true,
      autoComplete: "name",
      validate: (value) => {
        if (!value) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      },
    },
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
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: "phone",
      required: true,
      autoComplete: "tel",
      validate: (value) => {
        if (!value) return "Phone number is required";
        if (!validatePhone(value))
          return "Please enter a valid phone number (10-15 digits)";
        return "";
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      icon: "lock",
      required: true,
      autoComplete: "new-password",
      helperText:
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
      validate: (value) => {
        if (!value) return "Password is required";
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
      placeholder: "Confirm your password",
      icon: "lock",
      required: true,
      autoComplete: "new-password",
      validate: (value, formData) => {
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      },
    },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await registerAPI(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );

      // Store email for OTP verification
      setEmailForVerification(formData.email);

      setSuccessMessage("Registration successful! Please verify your email.");

      // Navigate to OTP verification
      setTimeout(() => {
        onNavigate("verify-otp");
      }, 1500);
    } catch (error) {
      setErrorMessage(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login click
  const handleLogin = () => {
    onNavigate("login");
  };

  // Footer content with links
  const footerContent = (
    <div
      style={{
        fontSize: "var(--font-size-sm)",
        color: "var(--text-secondary)",
      }}
    >
      Already have an account?{" "}
      <a
        className="auth-link"
        onClick={handleLogin}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
      >
        Sign in here
      </a>
    </div>
  );

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register to get started with Cypher Sentinel"
      fields={fields}
      buttonText="REGISTER"
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
