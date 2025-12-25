import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LayoutWrapper from "./layouts/LayoutWrapper";
import { CustomFrameworkProvider } from "./context/CustomFrameworkContext";
import { AuthProvider } from "./context/AuthContext";
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
                <LayoutWrapper>
                  <AppRoutes />
                </LayoutWrapper>
              </NavigationProvider>
            </CustomFrameworkProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
