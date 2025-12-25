import { Routes, Route, Navigate } from "react-router-dom";
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
 * Clean routing configuration without props drilling
 * All components now use contexts for their data needs
 */
export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes - Only accessible when NOT authenticated */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/resend-otp"
        element={
          <PublicRoute>
            <ResendOTP />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Only accessible when authenticated */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadDocument />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-framework"
        element={
          <ProtectedRoute>
            <UploadFramework />
          </ProtectedRoute>
        }
      />

      <Route
        path="/framework"
        element={
          <ProtectedRoute>
            <FrameworkSelection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/framework-comparison"
        element={
          <ProtectedRoute>
            <FrameworkComparison />
          </ProtectedRoute>
        }
      />

      <Route
        path="/framework-controls"
        element={
          <ProtectedRoute>
            <FrameworkControls />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comparison-results"
        element={
          <ProtectedRoute>
            <ComparisonResults />
          </ProtectedRoute>
        }
      />

      <Route
        path="/details"
        element={
          <ProtectedRoute>
            <FrameworkDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-extractor"
        element={
          <ProtectedRoute>
            <AIFrameworkExtractor />
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
