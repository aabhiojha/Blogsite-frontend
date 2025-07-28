import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../../endpoints.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set axios default headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // You could also validate the token with the backend here
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, {
        username,
        password,
      });

      const { token: authToken, user_id, username: userName } = response.data;
      
      setToken(authToken);
      setUser({
        id: user_id,
        username: userName,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  };

  const register = async (username, password, email) => {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.REGISTER, {
        username,
        password,
        email,
      });

      const { token: authToken, user_id, username: userName } = response.data;
      
      setToken(authToken);
      setUser({
        id: user_id,
        username: userName,
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(AUTH_ENDPOINTS.LOGOUT);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
