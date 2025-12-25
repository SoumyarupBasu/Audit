import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute Component
 * Wraps protected pages that require authentication.
 * If user is not authenticated, redirects to login page.
 * 
 * @param {React.ReactNode} children - The component to render if authenticated
 * @param {Function} onNavigate - Navigation function to redirect if not authenticated
 */
function ProtectedRoute({ children, onNavigate }) {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Only redirect after loading is complete and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      onNavigate('login')
    }
  }, [isAuthenticated, isLoading, onNavigate])

  // Show nothing while checking authentication status
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // If not authenticated, don't render children (redirect will happen via useEffect)
  if (!isAuthenticated) {
    return null
  }

  // User is authenticated, render the protected content
  return <>{children}</>
}

export default ProtectedRoute

