import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "./AppLayout";
import { generateBreadcrumbs } from "../utils/generateBreadcrumbs";

/**
 * Layout Wrapper Component
 * Automatically selects the appropriate layout based on the current route and auth status
 * Provides page-specific header configuration to AppLayout
 */
function LayoutWrapper({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || "";

  // Define which routes should NOT use AppLayout (auth pages handle their own layout)
  const authRoutes = [
    "/login",
    "/register",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];

  // For auth pages when not authenticated, just render children
  // (auth components use AuthLayout internally)
  const isAuthPage = !isAuthenticated && authRoutes.includes(location.pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  const headerActionsMap = {
    "/framework": [
      {
        id: "ai-extract",
        label: "🤖 AI Extract Framework",
        onClick: () => (window.location.href = "/ai-extractor"),
        className: "primary",
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
        },
      },
      {
        id: "back",
        label: "← BACK",
        onClick: () => window.history.back(),
        className: "ghost",
      },
    ],
  };

  const headerActions = headerActionsMap[location.pathname] || [];

  // Use main app layout for all other cases
  return (
    <AppLayout
      pageTitle={pageTitle}
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
    >
      {children}
    </AppLayout>
  );
}

export default LayoutWrapper;
