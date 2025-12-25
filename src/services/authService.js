/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

const API_BASE_URL = 'http://192.168.1.21:3000/api/auth'

/**
 * Helper function to make API requests
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || data.error || 'Something went wrong',
        data
      }
    }

    return data
  } catch (error) {
    if (error.status) {
      throw error
    }
    throw {
      status: 500,
      message: error.message || 'Network error. Please check your connection.',
      data: null
    }
  }
}

/**
 * Login with email and password
 * POST /api/auth/login
 */
export async function login(email, password) {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function register(name, email, phone, password) {
  return apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, password })
  })
}

/**
 * Verify OTP for email verification
 * POST /api/auth/verify-otp
 */
export async function verifyOTP(email, otp) {
  return apiRequest('/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp })
  })
}

/**
 * Request password reset (send OTP to email)
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(email) {
  return apiRequest('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

/**
 * Reset password with OTP
 * POST /api/auth/reset-password
 */
export async function resetPassword(email, otp, newPassword, confirmPassword) {
  return apiRequest('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, otp, newPassword, confirmPassword })
  })
}

/**
 * Resend OTP to email
 * POST /api/auth/resend-otp
 */
export async function resendOTP(email) {
  return apiRequest('/resend-otp', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

// Export all functions as default object
export default {
  login,
  register,
  verifyOTP,
  forgotPassword,
  resetPassword,
  resendOTP
}

