import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { forgotPassword as forgotPasswordAPI } from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setEmailForVerification } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPasswordAPI(formData.email);

      // Store email for reset password flow
      setEmailForVerification(formData.email);

      toast.success(
        response.message || "OTP sent to your email. Please check your inbox"
      );

      // Navigate to reset password page
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (error) {
      console.error(error.message || "Failed to send OTP. Please try again.");
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Form Header */}
      <div className="auth-form-header">
        <h2 className="auth-form-title">Forgot Password?</h2>
        <p className="auth-form-description">
          Enter your email address and we'll send you an OTP to reset your
          password
        </p>
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <div className="input-wrapper">
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
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : "SEND OTP"}
        </button>

        <div className="auth-footer">
          <div
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--text-secondary)",
            }}
          >
            Remember your password?{" "}
            <Link to={"/login"} className="auth-link" role="button">
              Login here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
