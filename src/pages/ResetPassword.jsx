import React, { useState } from 'react'
import Icon from '../components/Icon'
import '../styles/auth.css'

export default function ResetPassword({ email, onResetPassword, onNavigate, theme, onThemeToggle }) {
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  // Validate password strength
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character'
    }
    return ''
  }

  // Validate form field
  const validateField = (name, value) => {
    switch (name) {
      case 'otp':
        if (!value) return 'OTP is required'
        if (!/^\d{4}$/.test(value)) return 'OTP must be exactly 4 digits'
        return ''
      case 'newPassword':
        if (!value) return 'New password is required'
        return validatePassword(value)
      case 'confirmPassword':
        if (!value) return 'Please confirm your password'
        if (value !== formData.newPassword) return 'Passwords do not match'
        return ''
      default:
        return ''
    }
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // For OTP, only allow digits and max 4 characters
    if (name === 'otp') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 4)
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle input blur
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
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Check OTP
    if (formData.otp !== '1234') {
      setErrors(prev => ({
        ...prev,
        otp: 'Invalid OTP. Please try again.'
      }))
      return
    }

    // Start loading
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // Call parent handler
      onResetPassword(formData.otp, formData.newPassword)
    }, 1000)
  }

  // Handle resend OTP
  const handleResendOTP = () => {
    setResendMessage(`OTP resent to ${email}`)
    setTimeout(() => {
      setResendMessage('')
    }, 3000)
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
            Reset Password
          </h1>
          <p className="auth-subtitle">
            Enter the OTP sent to your email and create a new password
          </p>
        </div>

        {/* Success Message */}
        <div className="auth-message info">
          <Icon name="info" size="18px" />
          <span>OTP sent to {email}</span>
        </div>

        {/* Resend Message */}
        {resendMessage && (
          <div className="auth-message success">
            <Icon name="check" size="18px" />
            <span>{resendMessage}</span>
          </div>
        )}

        {/* Reset Password Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* OTP Field */}
          <div className="form-group">
            <label htmlFor="otp" className="form-label required">
              Enter OTP
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Icon name="lock" size="20px" />
              </div>
              <input
                type="text"
                id="otp"
                name="otp"
                className={`form-input ${errors.otp ? 'error' : ''}`}
                placeholder="Enter 4-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                aria-label="OTP"
                aria-invalid={!!errors.otp}
                aria-describedby={errors.otp ? 'otp-error' : undefined}
                maxLength={4}
                autoFocus
              />
            </div>
            {errors.otp && (
              <p id="otp-error" className="form-error">
                <Icon name="warning" size="14px" />
                {errors.otp}
              </p>
            )}
            <p className="form-helper">
              For demo purposes, use OTP: 1234
            </p>
          </div>

          {/* New Password Field */}
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label required">
              New Password
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Icon name="lock" size="20px" />
              </div>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                className={`form-input has-icon-right ${errors.newPassword ? 'error' : ''}`}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                aria-label="New password"
                aria-invalid={!!errors.newPassword}
                aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                autoComplete="new-password"
              />
              <div
                className="input-icon-right"
                onClick={() => setShowNewPassword(!showNewPassword)}
                role="button"
                tabIndex={0}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowNewPassword(!showNewPassword)
                  }
                }}
              >
                <Icon name={showNewPassword ? 'eye-off' : 'eye'} size="18px" />
              </div>
            </div>
            {errors.newPassword && (
              <p id="newPassword-error" className="form-error">
                <Icon name="warning" size="14px" />
                {errors.newPassword}
              </p>
            )}
            <p className="form-helper">
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label required">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Icon name="lock" size="20px" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input has-icon-right ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                aria-label="Confirm password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                autoComplete="new-password"
              />
              <div
                className="input-icon-right"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                role="button"
                tabIndex={0}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                }}
              >
                <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size="18px" />
              </div>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="form-error">
                <Icon name="warning" size="14px" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {!isLoading && 'Reset Password'}
          </button>

          {/* Footer */}
          <div className="auth-footer">
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Didn't receive OTP?{' '}
              <a
                className="auth-link"
                onClick={handleResendOTP}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleResendOTP()
                }}
              >
                Resend OTP
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

