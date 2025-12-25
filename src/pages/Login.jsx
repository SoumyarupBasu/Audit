import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { login as loginAPI } from '../services/authService'
import '../styles/auth.css'

export default function Login({ onNavigate, theme, onThemeToggle, onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { login } = useAuth()

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Field configurations
  const fields = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      icon: 'mail',
      required: true,
      autoComplete: 'email',
      validate: (value) => {
        if (!value) return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        return ''
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      icon: 'lock',
      required: true,
      autoComplete: 'current-password',
      validate: (value) => {
        if (!value) return 'Password is required'
        return ''
      }
    }
  ]

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await loginAPI(formData.email, formData.password)

      // Store auth data
      login(response.user, response.token)

      setSuccessMessage('Login successful! Redirecting...')

      // Notify parent of successful login
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(response.user, response.token)
        }
      }, 500)
    } catch (error) {
      setErrorMessage(error.message || 'Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle forgot password click
  const handleForgotPassword = () => {
    onNavigate('forgot-password')
  }

  // Handle register click
  const handleRegister = () => {
    onNavigate('register')
  }

  // Footer content with links
  const footerContent = (
    <>
      <a
        className="auth-link"
        onClick={handleForgotPassword}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleForgotPassword()}
      >
        Forgot password?
      </a>
      <div style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
        Don't have an account?{' '}
        <a
          className="auth-link"
          onClick={handleRegister}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
        >
          Register here
        </a>
      </div>
    </>
  )

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      fields={fields}
      buttonText="LOGIN"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successMessage}
      footerContent={footerContent}
      theme={theme}
      onThemeToggle={onThemeToggle}
    />
  )
}
