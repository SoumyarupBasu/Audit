import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import CustomFrameworkBuilder from "../pages/CustomFrameworkBuilder";
import "../styles/auth.css";

/**
 * Main Application Layout Component
 * Handles the overall layout structure including navigation and main content area
 */
function AppLayout({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-layout">
      {/* Show navigation only for authenticated users */}
      {isAuthenticated && <Navigation />}

      {/* Main content area */}
      <main className={isAuthenticated ? "main-content" : ""}>{children}</main>

      {/* Custom Framework Builder Modal - Available globally */}
      <CustomFrameworkBuilder />
    </div>
  );
}

export default AppLayout;
