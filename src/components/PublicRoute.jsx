import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * PublicRoute Component
 * Wraps public pages (login, register, etc.) that should only be accessible
 * when user is NOT authenticated.
 * If user is authenticated, redirects to dashboard.
 * 
 * @param {React.ReactNode} children - The component to render if not authenticated
 * @param {Function} onNavigate - Navigation function to redirect if authenticated
 */
function PublicRoute({ children, onNavigate }) {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Only redirect after loading is complete and user is authenticated
    if (!isLoading && isAuthenticated) {
      onNavigate('dashboard')
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

  // If authenticated, don't render children (redirect will happen via useEffect)
  if (isAuthenticated) {
    return null
  }

  // User is not authenticated, render the public content
  return <>{children}</>
}

export default PublicRoute

