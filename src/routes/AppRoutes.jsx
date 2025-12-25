import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import all page components
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ResendOTP from "../pages/ResendOTP";
import Dashboard from "../pages/Dashboard";
import UploadDocument from "../pages/UploadDocument";
import UploadFramework from "../pages/UploadFramework";
import FrameworkSelection from "../pages/FrameworkSelection";
import FrameworkDetails from "../pages/FrameworkDetails";
import FrameworkComparison from "../pages/FrameworkComparison";
import FrameworkControls from "../pages/FrameworkControls";
import ComparisonResults from "../pages/ComparisonResults";
import AIFrameworkExtractor from "../pages/AIFrameworkExtractor";

// Import route protection components
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

/**
 * Main routing configuration for the application
 * Handles both public (authentication) and protected routes
 */
export function AppRoutes({
  selectedFile,
  setSelectedFile,
  selectedFramework,
  setSelectedFramework,
  uploadedFrameworks,
  setUploadedFrameworks,
  currentUploadedFramework,
  setCurrentUploadedFramework,
  frameworkForControls,
  setFrameworkForControls,
  comparisonJobId,
  setComparisonJobId,
  comparisonFramework,
  setComparisonFramework,
  successMessage,
  setSuccessMessage,
  theme,
  setTheme,
  handleFileUpload,
  handleFrameworkSelect,
  handleFrameworkUpload,
  handleFrameworkComparison,
  handleViewControls,
  handleComparisonComplete,
  handleLogout,
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Create navigation handlers that use React Router
  const createNavigationHandler = (path) => () => navigate(path);

  return (
    <Routes>
      {/* Public Routes - Only accessible when NOT authenticated */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login
              onLoginSuccess={createNavigationHandler("/dashboard")}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
              theme={theme}
              setTheme={setTheme}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register
              onRegisterSuccess={createNavigationHandler("/verify-otp")}
              theme={theme}
              setTheme={setTheme}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <VerifyOTP
              onVerificationSuccess={createNavigationHandler("/dashboard")}
              theme={theme}
              setTheme={setTheme}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword
              onSuccess={createNavigationHandler("/resend-otp")}
              theme={theme}
              setTheme={setTheme}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword
              onSuccess={createNavigationHandler("/login")}
              theme={theme}
              setTheme={setTheme}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/resend-otp"
        element={
          <PublicRoute>
            <ResendOTP
              onSuccess={createNavigationHandler("/reset-password")}
              theme={theme}
              setTheme={setTheme}
            />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Only accessible when authenticated */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadDocument
              selectedFile={selectedFile}
              onFileUpload={(file) => {
                handleFileUpload(file);
                navigate("/framework");
              }}
              onComparisonComplete={(jobId, framework) => {
                handleComparisonComplete(jobId, framework);
                navigate("/comparison-results");
              }}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-framework"
        element={
          <ProtectedRoute>
            <UploadFramework
              onFrameworkUpload={(frameworkData) => {
                handleFrameworkUpload(frameworkData);
                navigate("/framework-comparison");
              }}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/framework"
        element={
          <ProtectedRoute>
            <FrameworkSelection
              selectedFile={selectedFile}
              selectedFramework={selectedFramework}
              uploadedFrameworks={uploadedFrameworks}
              onFrameworkSelect={(framework) => {
                handleFrameworkSelect(framework);
                navigate("/details");
              }}
              onSeeControls={(framework) => {
                handleViewControls(framework);
                navigate("/framework-controls");
              }}
              onBack={createNavigationHandler("/upload")}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/framework-comparison"
        element={
          <ProtectedRoute>
            <FrameworkComparison
              uploadedFramework={currentUploadedFramework}
              onDocumentUpload={(
                documentFile,
                customFramework,
                similarFrameworks
              ) => {
                setSelectedFile(documentFile);
                setSelectedFramework(customFramework);
                navigate("/details");
              }}
              onBack={createNavigationHandler("/upload-framework")}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/framework-controls"
        element={
          <ProtectedRoute>
            <FrameworkControls
              framework={frameworkForControls}
              onBack={createNavigationHandler("/framework")}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comparison-results"
        element={
          <ProtectedRoute>
            <ComparisonResults
              jobId={comparisonJobId}
              framework={comparisonFramework}
              onBack={createNavigationHandler("/upload")}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/details"
        element={
          <ProtectedRoute>
            <FrameworkDetails
              selectedFramework={selectedFramework}
              selectedFile={selectedFile}
              uploadedFrameworks={uploadedFrameworks}
              onBack={createNavigationHandler("/framework-comparison")}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-extractor"
        element={
          <ProtectedRoute>
            <AIFrameworkExtractor
              onFrameworkCreated={(framework) => {
                console.log("AI Framework created:", framework);
                // Optionally navigate to frameworks after creation
              }}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
            />
          </ProtectedRoute>
        }
      />

      {/* Root redirect */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />

      {/* Catch all - redirect to appropriate page */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}
