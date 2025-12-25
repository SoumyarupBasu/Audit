import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomFrameworkBuilder from "./pages/CustomFrameworkBuilder";
import ErrorBoundary from "./components/ErrorBoundary";
import { CustomFrameworkProvider } from "./context/CustomFrameworkContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./styles/framework.css";
import "./styles/frameworkDetails.css";
import "./styles/frameworkControls.css";
import "./styles/navigation.css";
import "./styles/dashboard.css";
import "./styles/icons.css";
import "./styles/customFramework.css";
import "./styles/comparisonResults.css";

// Main App wrapper that provides AuthContext and Router
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CustomFrameworkProvider>
            <AppContent />
          </CustomFrameworkProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

// Inner component that can use useAuth hook and navigation
function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  // Application state
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [uploadedFrameworks, setUploadedFrameworks] = useState([]);
  const [currentUploadedFramework, setCurrentUploadedFramework] =
    useState(null);
  const [frameworkForControls, setFrameworkForControls] = useState(null);
  const [comparisonJobId, setComparisonJobId] = useState(null);
  const [comparisonFramework, setComparisonFramework] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // Logout handler
  function handleLogout() {
    logout();
    setSelectedFile(null);
    setSelectedFramework(null);
    setSuccessMessage("");
  }

  function handleFileUpload(file) {
    setSelectedFile(file);
  }

  function handleFrameworkUpload(frameworkData) {
    setUploadedFrameworks((prev) => [...prev, frameworkData]);
    setCurrentUploadedFramework(frameworkData);
  }

  function handleFrameworkSelect(framework) {
    setSelectedFramework(framework);
  }

  function handleFrameworkComparison(jobId, framework) {
    setComparisonJobId(jobId);
    setComparisonFramework(framework);
  }

  function handleComparisonComplete(jobId, framework) {
    setComparisonJobId(jobId);
    setComparisonFramework(framework);
  }

  function handleViewControls(framework) {
    setFrameworkForControls(framework);
  }

  function handleNavigateToFrameworkFromBuilder(framework) {
    setFrameworkForControls(framework);
    window.location.href = "/framework-controls";
  }

  function handleThemeToggle() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const root = document.documentElement;
    if (newTheme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }

  // Apply theme on component mount
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  return (
    <div className="app-layout">
      {/* Show navigation only for authenticated users */}
      {isAuthenticated && (
        <Navigation
          onThemeToggle={handleThemeToggle}
          onLogout={handleLogout}
          theme={theme}
        />
      )}

      {/* Main content area */}
      <main className={isAuthenticated ? "main-content" : ""}>
        {/* Success message after password reset */}
        {successMessage && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 9999,
              padding: "var(--spacing-md)",
              background: "var(--success-bg)",
              color: "var(--success)",
              border: "1px solid var(--success)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* Routes */}
        <AppRoutes
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          selectedFramework={selectedFramework}
          setSelectedFramework={setSelectedFramework}
          uploadedFrameworks={uploadedFrameworks}
          setUploadedFrameworks={setUploadedFrameworks}
          currentUploadedFramework={currentUploadedFramework}
          setCurrentUploadedFramework={setCurrentUploadedFramework}
          frameworkForControls={frameworkForControls}
          setFrameworkForControls={setFrameworkForControls}
          comparisonJobId={comparisonJobId}
          setComparisonJobId={setComparisonJobId}
          comparisonFramework={comparisonFramework}
          setComparisonFramework={setComparisonFramework}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          theme={theme}
          setTheme={setTheme}
          handleFileUpload={handleFileUpload}
          handleFrameworkSelect={handleFrameworkSelect}
          handleFrameworkUpload={handleFrameworkUpload}
          handleFrameworkComparison={handleFrameworkComparison}
          handleViewControls={handleViewControls}
          handleComparisonComplete={handleComparisonComplete}
          handleLogout={handleLogout}
        />
      </main>

      {/* Custom Framework Builder Modal */}
      <CustomFrameworkBuilder
        onNavigateToFramework={handleNavigateToFrameworkFromBuilder}
      />
    </div>
  );
}

export default App;
