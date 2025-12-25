import { useState } from "react";
import Icon from "../components/Icon";
import "../styles/auth.css";
import { Link } from "react-router-dom";

/**
 * Reusable Authentication Layout Component
 *
 * Props:
 * - title: Form title (e.g., "Welcome Back", "Create Account")
 * - subtitle: Form description
 * - fields: Array of field configurations
 * - buttonText: Submit button text
 * - onSubmit: Form submission handler
 * - isLoading: Loading state
 * - errorMessage: Error message to display
 * - successMessage: Success message to display
 * - footerContent: Custom footer content (JSX)
 * - backLink: Back link configuration { text, onClick }
 * - theme: Current theme
 * - onThemeToggle: Theme toggle handler
 */
export default function AuthLayout({
  title,
  subtitle,
  fields = [],
  buttonText = "Submit",
  onSubmit,
  isLoading = false,
  errorMessage = "",
  successMessage = "",
  footerContent,
  backLink,
  theme,
  onThemeToggle,
}) {
  // Form state - dynamically created from fields
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((field) => {
      initial[field.name] = field.defaultValue || "";
    });
    return initial;
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle input blur - validate field
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const field = fields.find((f) => f.name === name);

    if (field && field.validate) {
      const error = field.validate(value, formData);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    fields.forEach((field) => {
      if (field.validate) {
        const error = field.validate(formData[field.name], formData);
        if (error) newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call parent submit handler
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  // Render a single form field
  const renderField = (field) => {
    const isPassword = field.type === "password";
    const showPwd = showPassword[field.name];
    const inputType = isPassword ? (showPwd ? "text" : "password") : field.type;

    return (
      <div className="form-group" key={field.name}>
        <label
          htmlFor={field.name}
          className={`form-label ${field.required ? "required" : ""}`}
        >
          {field.label}
        </label>
        <div className="input-wrapper">
          {field.icon && (
            <div className="input-icon">
              <Icon name={field.icon} size="20px" />
            </div>
          )}
          <input
            type={inputType}
            id={field.name}
            name={field.name}
            className={`form-input ${isPassword ? "has-icon-right" : ""} ${
              errors[field.name] ? "error" : ""
            }`}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label={field.label}
            aria-invalid={!!errors[field.name]}
            autoComplete={field.autoComplete}
            maxLength={field.maxLength}
          />
          {isPassword && (
            <div
              className="input-icon-right"
              onClick={() => togglePasswordVisibility(field.name)}
              role="button"
              tabIndex={0}
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              <Icon name={showPwd ? "eye-off" : "eye"} size="18px" />
            </div>
          )}
        </div>
        {errors[field.name] && (
          <p className="form-error">
            <Icon name="warning" size="14px" />
            {errors[field.name]}
          </p>
        )}
        {field.helperText && <p className="form-helper">{field.helperText}</p>}
      </div>
    );
  };

  return (
    <div className="auth-container">
      {/* Theme Toggle Button */}
      {onThemeToggle && (
        <button
          className="auth-theme-toggle"
          onClick={onThemeToggle}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <Icon name={theme === "light" ? "moon" : "sun"} size="20px" />
        </button>
      )}

      {/* Left Side - Visual/Branding Section */}
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-logo-large">
            <div className="auth-logo-icon-large">
              <Icon name="shield" size="64px" style={{ color: "white" }} />
            </div>
          </div>
          <h1 className="auth-visual-title">CYPHER SENTINEL</h1>
          <p className="auth-visual-subtitle">
            AI-Powered Compliance Auditing Platform
          </p>

          <div className="auth-visual-features">
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="check-circle" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Automated Compliance</h3>
                <p>Streamline your audit processes with AI</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="shield" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Multi-Framework Support</h3>
                <p>ISO 27001, NIST, SOX, GDPR & more</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="chart" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Real-Time Insights</h3>
                <p>Monitor compliance status instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          {/* Back Link */}
          {backLink && (
            <Link
              className="auth-back-button"
              onClick={backLink.onClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && backLink.onClick()}
            >
              <Icon name="arrow-left" size="16px" />
              {backLink.text}
            </Link>
          )}

          {/* Form Header */}
          <div className="auth-form-header">
            <h2 className="auth-form-title">{title}</h2>
            <p className="auth-form-description">{subtitle}</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="auth-message error">
              <Icon name="warning" size="18px" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="auth-message success">
              <Icon name="check-circle" size="18px" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {fields.map(renderField)}

            {/* Submit Button */}
            <button
              type="submit"
              className={`auth-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {!isLoading && buttonText}
            </button>

            {/* Footer Content */}
            {footerContent && (
              <div className="auth-footer">{footerContent}</div>
            )}
          </form>

          {/* Additional Form Footer */}
          <div className="auth-form-footer" />
        </div>
      </div>
    </div>
  );
}
