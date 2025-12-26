import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "./AppLayout";

/**
 * Layout Wrapper Component
 * Automatically selects the appropriate layout based on the current route and auth status
 * Uses existing AuthLayout for auth pages (AuthLayout is used directly by auth components)
 */
function LayoutWrapper({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Define which routes should NOT use AppLayout (auth pages handle their own layout)
  const authRoutes = [
    "/login",
    "/register",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
    "/resend-otp",
  ];

  // For auth pages when not authenticated, just render children
  // (auth components use AuthLayout internally)
  const isAuthPage = !isAuthenticated && authRoutes.includes(location.pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Use main app layout for all other cases
  return <AppLayout>{children}</AppLayout>;
}

export default LayoutWrapper;
