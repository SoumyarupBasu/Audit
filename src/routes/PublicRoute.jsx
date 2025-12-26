import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PublicRoute Component
 * Wraps public pages (login, register, etc.) that should only be accessible
 * when user is NOT authenticated.
 * If user is authenticated, redirects to dashboard.
 *
 * @param {React.ReactNode} children - The component to render if not authenticated
 */
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication status
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the public content
  return children;
}

export default PublicRoute;
