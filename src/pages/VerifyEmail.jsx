import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { verifyEmail } from "../services/authService";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown} seconds before requesting again.`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyEmail(formData.email);

      // Store email for verification
      setEmailForVerification(formData.email);

      toast.success(
        response.message || "OTP sent successfully! Check your email."
      );
      setCooldown(60); // 60 second cooldown

      // Navigate to verify OTP after a short delay
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1000);
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
        <h2 className="auth-form-title">Vertfy Email</h2>
        <p className="auth-form-description">
          Enter your email address to receive a new verification code
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
            <Link className="auth-link" to={"/login"} role="button">
              Login here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
