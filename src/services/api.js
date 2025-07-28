import axios from 'axios';
import { API_ENDPOINTS } from '../endpoints.js';

// Create axios instance with default config
const api = axios.create({
  timeout: 10000,
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, remove it
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Blog API functions
export const blogAPI = {
  // Get all posts
  getPosts: () => api.get(API_ENDPOINTS.POSTS),
  
  // Get single post
  getPost: (id) => api.get(API_ENDPOINTS.POST_DETAIL(id)),
  
  // Create new post (requires authentication)
  createPost: (postData) => api.post(API_ENDPOINTS.CREATE_POST, postData),
  
  // Update post (requires authentication)
  updatePost: (id, postData) => api.put(API_ENDPOINTS.POST_DETAIL(id), postData),
  
  // Delete post (requires authentication)
  deletePost: (id) => api.delete(API_ENDPOINTS.POST_DETAIL(id)),
};

export default api;
