import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import CustomFrameworkBuilder from "../pages/CustomFrameworkBuilder";
import "../styles/auth.css";

/**
 * Main Application Layout Component
 * Handles the overall layout structure including navigation, header, and main content area
 */
function AppLayout({
  children,
  pageTitle,
  breadcrumbs = [],
  headerActions = [],
}) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-layout">
      {/* Show navigation only for authenticated users */}
      {isAuthenticated && <Navigation />}

      {/* Main content area */}
      <main className={isAuthenticated ? "main-content" : ""}>
        {/* Show header only for authenticated users and when pageTitle is provided */}
        {isAuthenticated && pageTitle && (
          <Header
            title={pageTitle}
            breadcrumbs={breadcrumbs}
            actions={headerActions}
          />
        )}

        {/* Page content */}
        <div className="page-content">{children}</div>
      </main>

      {/* Custom Framework Builder Modal - Available globally */}
      <CustomFrameworkBuilder />
    </div>
  );
}

export default AppLayout;
