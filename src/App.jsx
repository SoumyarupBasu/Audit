import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
                  <Toaster
                    position="top-center"
                    gutter={10}
                    containerStyle={{
                      zIndex: 99999, // Higher than modal z-index (10000)
                    }}
                    toastOptions={{
                      duration: 2000,
                      style: {
                        background: "var(--bg-2)",
                        color: "var(--text)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-md)",
                        fontSize: "var(--font-size-sm)",
                        fontFamily: "var(--font-family)",
                        zIndex: 99999, // Ensure individual toasts also have high z-index
                      },

                      success: {
                        duration: 3000,
                        iconTheme: {
                          primary: "var(--success)",
                          secondary: "var(--bg)",
                        },
                        style: {
                          borderLeft: "4px solid var(--success)",
                          background: "var(--bg-2)",
                          zIndex: 99999,
                        },
                      },

                      error: {
                        duration: 4000,
                        iconTheme: {
                          primary: "var(--error)",
                          secondary: "var(--bg)",
                        },
                        style: {
                          borderLeft: "4px solid var(--error)",
                          background: "var(--bg-2)",
                          zIndex: 99999,
                        },
                      },

                      loading: {
                        iconTheme: {
                          primary: "var(--primary)",
                          secondary: "var(--bg)",
                        },
                      },
                    }}
                  />
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
