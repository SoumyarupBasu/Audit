/**
 * User Management API Service
 * Handles all user CRUD operations
 */

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

/**
 * Helper function to get auth token from localStorage
 * Token is stored directly as 'authToken' by AuthContext
 */
function getAuthToken() {
  return localStorage.getItem("authToken");
}

/**
 * Helper function to make authenticated API requests
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
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
 * Get all users with pagination, search, and sorting
 * GET /api/users?page=1&limit=10&search=query&sortBy=field&sortOrder=asc/desc
 */
export async function getAllUsers({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "",
  sortOrder = "",
} = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
  });

  return apiRequest(`/user/all-users?${params.toString()}`);
}

/**
 * Get a single user by ID
 * GET /api/user/:id
 */
export async function getUserById(userId) {
  return apiRequest(`/user/${userId}`);
}

/**
 * Create a new user
 * POST /api/user/create
 */
export async function createUser(userData) {
  return apiRequest("/user/create", {
    method: "POST",
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
    }),
  });
}

/**
 * Update a user
 * PUT /api/user/update/:id
 */
export async function updateUserByAdmin(userId, userData) {
  return apiRequest(`/user/update/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: userData.name,
      phone: userData.phone,
      role: userData.role,
    }),
  });
}

/**
 * Update user profile
 * PUT /api/user/profile/update
 */
export async function updateUser(userData) {
  return apiRequest("/user/profile/update", {
    method: "PUT",
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    }),
  });
}

/**
 * Delete a user
 * DELETE /api/user/:id
 */
export async function deleteUser(userId) {
  return apiRequest(`/user/${userId}`, {
    method: "DELETE",
  });
}

// Export all functions as default object
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
