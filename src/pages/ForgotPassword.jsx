import React, { useState } from 'react'
import Icon from '../components/Icon'
import '../styles/auth.css'

export default function ForgotPassword({ onSendOTP, onNavigate, theme, onThemeToggle }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  // Handle input blur
  const handleBlur = () => {
    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address')
    }
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate email
    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Check if email is the demo email
    if (email !== 'admin@gmail.com') {
      setError('Email not found. Please use admin@gmail.com for demo.')
      return
    }

    // Start loading
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // Call parent handler to store email and navigate
      onSendOTP(email)
    }, 1000)
  }

  // Handle back to login
  const handleBackToLogin = () => {
    onNavigate('login')
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="auth-container">
      {/* Theme Toggle Button - Top Right */}
      {onThemeToggle && (
        <button
          className="auth-theme-toggle"
          onClick={onThemeToggle}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size="20px" />
        </button>
      )}

      <div className="auth-card">
        {/* Back Button */}
        <a
          className="auth-back-button"
          onClick={handleBackToLogin}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleBackToLogin()
          }}
        >
          <Icon name="arrow-left" size="16px" />
          Back to Login
        </a>

        {/* Branding Section */}
        <div className="auth-branding">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Icon name="shield" size="48px" style={{ color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
            </div>
          </div>
          <h1 className="auth-title" style={{ fontSize: 'var(--font-size-3xl)' }}>
            Forgot Password?
          </h1>
          <p className="auth-subtitle">
            Enter your email address and we'll send you an OTP to reset your password
          </p>
        </div>

        {/* Forgot Password Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label required">
              Email Address
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Icon name="mail" size="20px" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${error ? 'error' : ''}`}
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                aria-label="Email address"
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
                autoComplete="email"
                autoFocus
              />
            </div>
            {error && (
              <p id="email-error" className="form-error">
                <Icon name="warning" size="14px" />
                {error}
              </p>
            )}
            <p className="form-helper">
              For demo purposes, use: admin@gmail.com
            </p>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {!isLoading && 'Send OTP'}
          </button>

          {/* Footer */}
          <div className="auth-footer">
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Remember your password?{' '}
              <a
                className="auth-link"
                onClick={handleBackToLogin}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleBackToLogin()
                }}
              >
                Login here
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

