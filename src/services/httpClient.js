import axios from 'axios';
import { API_CONFIG } from '../utils/constants';
import tokenManager from '../utils/tokenManager';

/**
 * HTTP Client - Centralized Axios instance with interceptors
 * Handles all API communication with authentication and error management
 */

const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor - Add auth token to all requests
 */
httpClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle token expiration and errors
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      tokenManager.clearAuthData();
      // Optionally redirect to login
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default httpClient;
