/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

/**
 * Helper function to make API requests
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || data.error || "Something went wrong",
        data,
      };
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 500,
      message: error.message || "Network error. Please check your connection.",
      data: null,
    };
  }
}

/**
 * Login with email and password
 * POST /api/auth/login
 */
export async function login(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function register({ name, email, phone, password }) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, phone, password }),
  });
}

/**
 * Verify OTP for email verification
 * POST /api/auth/verify-otp
 */
export async function verifyOTP(email, otp) {
  return apiRequest("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
}

/**
 * Request password reset (send OTP to email)
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/**
 * Reset password with OTP
 * POST /api/auth/reset-password
 */
export async function resetPassword({ email, otp, password }) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, otp, password }),
  });
}

/**
 * Resend OTP to email
 * POST /api/auth/resend-otp
 */
export async function resendOTP(email) {
  return apiRequest("/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/**
 * Resend OTP to verify email
 * POST /api/auth/verify-email
 */
export async function verifyEmail(email) {
  return apiRequest("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Export all functions as default object
export default {
  login,
  register,
  verifyOTP,
  forgotPassword,
  resetPassword,
  resendOTP,
  verifyEmail,
};
