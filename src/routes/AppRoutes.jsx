import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

// Import protected page components
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
 * Simple routing - auth routes use AuthLayout directly
 */
export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Auth Routes - All use AuthLayout directly */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route
        path="/resend-otp"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
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

      {/* Catch all */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}
