import React, { createContext, useContext, useState, useEffect } from 'react'

// Create Auth Context
const AuthContext = createContext(null)

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingEmail, setPendingEmail] = useState('') // For OTP verification flow

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  // Login function - store token and user data
  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    setIsAuthenticated(true)
    localStorage.setItem('authToken', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout function - clear all auth data
  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    setPendingEmail('')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  // Store pending email for OTP verification
  const setEmailForVerification = (email) => {
    setPendingEmail(email)
    sessionStorage.setItem('pendingEmail', email)
  }

  // Get pending email from session
  const getEmailForVerification = () => {
    return pendingEmail || sessionStorage.getItem('pendingEmail') || ''
  }

  // Clear pending email after verification
  const clearPendingEmail = () => {
    setPendingEmail('')
    sessionStorage.removeItem('pendingEmail')
  }

  // Update user data
  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Context value
  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    pendingEmail,
    login,
    logout,
    setEmailForVerification,
    getEmailForVerification,
    clearPendingEmail,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext

