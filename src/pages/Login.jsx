import React, { useState, useEffect } from 'react'
import Icon from '../components/Icon'
import '../styles/auth.css'

export default function Login({ onLogin, onNavigate, theme, onThemeToggle }) {
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: 'Admin@123',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate form field
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        return ''
      case 'password':
        if (!value) return 'Password is required'
        return ''
      default:
        return ''
    }
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Clear login error
    if (loginError) {
      setLoginError('')
    }
  }

  // Handle input blur - validate field
  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'rememberMe') {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Start loading
    setIsLoading(true)
    setLoginError('')

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (formData.email === 'admin@gmail.com' && formData.password === 'Admin@123') {
        // Successful login
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
          localStorage.setItem('userEmail', formData.email)
        }
        onLogin(formData.email, formData.password)
      } else {
        // Failed login
        setLoginError('Invalid email or password. Please try again.')
        setIsLoading(false)
      }
    }, 1000)
  }

  // Handle forgot password click
  const handleForgotPassword = () => {
    onNavigate('forgot-password')
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

      {/* Left Side - Branding & Visual */}
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-logo-large">
            <div className="auth-logo-icon-large">
              <Icon name="shield" size="64px" style={{ color: 'white' }} />
            </div>
          </div>
          <h1 className="auth-visual-title">CYPHER SENTINEL</h1>
          <p className="auth-visual-subtitle">AI-Powered Compliance Auditing Platform</p>

          <div className="auth-visual-features">
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="check-circle" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Automated Compliance</h3>
                <p>Streamline your audit processes with AI</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="shield" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Multi-Framework Support</h3>
                <p>ISO 27001, NIST, SOX, GDPR & more</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="feature-icon">
                <Icon name="chart" size="24px" />
              </div>
              <div className="feature-text">
                <h3>Real-Time Insights</h3>
                <p>Monitor compliance status instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          {/* Form Header */}
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome Back</h2>
            <p className="auth-form-description">Sign in to your account to continue</p>
          </div>

          {/* Login Error Message */}
          {loginError && (
            <div className="auth-message error">
              <Icon name="warning" size="18px" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
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
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                aria-label="Email address"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="form-error">
                <Icon name="warning" size="14px" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label required">
              Password
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Icon name="lock" size="20px" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`form-input has-icon-right ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                aria-label="Password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                autoComplete="current-password"
              />
              <div
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowPassword(!showPassword)
                  }
                }}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size="18px" />
              </div>
            </div>
            {errors.password && (
              <p id="password-error" className="form-error">
                <Icon name="warning" size="14px" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="form-checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="form-checkbox-label">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {!isLoading && 'LOGIN'}
          </button>

          {/* Footer Links */}
          <div className="auth-footer">
            <a
              className="auth-link"
              onClick={handleForgotPassword}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleForgotPassword()
              }}
            >
              Forgot password?
            </a>
          </div>
        </form>

        {/* Additional Info */}
        <div className="auth-form-footer">
          <p className="auth-footer-text">
            Don't have an account? <span className="auth-link-inline">Contact your administrator</span>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

