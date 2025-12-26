import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { login as loginAPI } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginAPI(formData.email, formData.password);
      login(response.user, response.token);
      toast.success(response.message || "Login successfull");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message || "Invalid email or password");
      toast.error(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Form Header */}
      <div className="auth-form-header">
        <h2 className="auth-form-title">Welcome Back</h2>
        <p className="auth-form-description">
          Sign in to your account to continue
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

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
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
          {isLoading ? "Signing in..." : "LOGIN"}
        </button>

        <div className="auth-footer">
          <Link className="auth-link" to={"/forgot-password"} role="button">
            Forgot password?
          </Link>
          <Link
            className="auth-link"
            style={{ marginLeft: "1rem" }}
            to={"/verify-email"}
            role="button"
          >
            Verify Email?
          </Link>
          <div
            style={{
              marginTop: "var(--spacing-lg)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Don't have an account?{" "}
            <Link className="auth-link" to={"/register"} role="button">
              Register here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
