import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "./AppLayout";

/**
 * Layout Wrapper Component
 * Automatically selects the appropriate layout based on the current route and auth status
 * Provides page-specific header configuration to AppLayout
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
    "/verify-email",
  ];

  // For auth pages when not authenticated, just render children
  // (auth components use AuthLayout internally)
  const isAuthPage = !isAuthenticated && authRoutes.includes(location.pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Page configuration for header
  const getPageConfig = () => {
    const routeConfigs = {
      "/dashboard": {
        title: "Dashboard",
        breadcrumbs: [{ label: "Dashboard", active: true }],
      },
      "/users": {
        title: "All Users",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "All Users", active: true },
        ],
      },
      "/upload": {
        title: "Upload Document",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Documents", path: "/dashboard" },
          { label: "Upload Document", active: true },
        ],
      },
      "/upload-framework": {
        title: "Upload Framework",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Frameworks", path: "/dashboard" },
          { label: "Upload Framework", active: true },
        ],
      },
      "/framework": {
        title: "Select Framework",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Documents", path: "/dashboard" },
          { label: "Framework Selection", active: true },
        ],
        actions: [
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
      },
      "/framework-comparison": {
        title: "Framework Comparison",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Framework Comparison", active: true },
        ],
      },
      "/framework-controls": {
        title: "Framework Controls",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Framework Controls", active: true },
        ],
      },
      "/comparison-results": {
        title: "Comparison Results",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Comparison Results", active: true },
        ],
      },
      "/details": {
        title: "Framework Details",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Framework Details", active: true },
        ],
      },
      "/ai-extractor": {
        title: "AI Framework Extractor",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "AI Framework Extractor", active: true },
        ],
      },
    };

    return routeConfigs[location.pathname] || { title: "", breadcrumbs: [] };
  };

  const pageConfig = getPageConfig();

  // Use main app layout for all other cases
  return (
    <AppLayout
      pageTitle={pageConfig.title}
      breadcrumbs={pageConfig.breadcrumbs}
      headerActions={pageConfig.actions || []}
    >
      {children}
    </AppLayout>
  );
}

export default LayoutWrapper;
