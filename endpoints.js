// API base URL - adjust this to match your Django server
const API_BASE_URL = 'http://localhost:8000';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login/`,
  REGISTER: `${API_BASE_URL}/api/auth/register/`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout/`,
};

// Blog API endpoints
export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/api/posts/`,
  POST_DETAIL: (id) => `${API_BASE_URL}/api/posts/${id}/`,
  CREATE_POST: `${API_BASE_URL}/api/posts/`,
};

export default API_BASE_URL;