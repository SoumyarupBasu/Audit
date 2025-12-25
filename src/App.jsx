import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomFrameworkBuilder from "./pages/CustomFrameworkBuilder";
import ErrorBoundary from "./components/ErrorBoundary";
import { CustomFrameworkProvider } from "./context/CustomFrameworkContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NavigationProvider } from "./context/NavigationContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./styles/framework.css";
import "./styles/frameworkDetails.css";
import "./styles/frameworkControls.css";
import "./styles/navigation.css";
import "./styles/dashboard.css";
import "./styles/icons.css";
import "./styles/customFramework.css";
import "./styles/comparisonResults.css";

// Main App wrapper that provides all contexts
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <CustomFrameworkProvider>
              <NavigationProvider>
                <AppContent />
              </NavigationProvider>
            </CustomFrameworkProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

// Clean app content component
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-layout">
      {/* Show navigation only for authenticated users */}
      {isAuthenticated && <Navigation />}

      {/* Main content area */}
      <main className={isAuthenticated ? "main-content" : ""}>
        <AppRoutes />
      </main>

      {/* Custom Framework Builder Modal */}
      <CustomFrameworkBuilder />
    </div>
  );
}

export default App;
