import { TOKEN_CONFIG } from './constants';

/**
 * Token Manager - Handles all token and user data storage operations
 * Provides a single source of truth for authentication data
 */

const tokenManager = {
  /**
   * Save authentication token and user data
   * @param {Object} data - Auth response data containing token and user info
   */
  saveAuthData: (data) => {
    if (!data || !data.token) {
      throw new Error('Invalid auth data');
    }

    try {
      localStorage.setItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY, data.token);
      localStorage.setItem(TOKEN_CONFIG.USER_ID_KEY, data.userID);
      localStorage.setItem(TOKEN_CONFIG.USER_EMAIL_KEY, data.email);
      localStorage.setItem(TOKEN_CONFIG.USER_FULL_NAME_KEY, data.fullName);
      localStorage.setItem(TOKEN_CONFIG.USER_ROLE_KEY, data.role);
      localStorage.setItem(TOKEN_CONFIG.EXPIRES_AT_KEY, data.expiresAt);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw new Error('Failed to save authentication data');
    }
  },

  /**
   * Get authentication token
   * @returns {string|null} - JWT token or null if not found
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
  },

  /**
   * Get current user data
   * @returns {Object|null} - User data object or null if not found
   */
  getUser: () => {
    const userId = localStorage.getItem(TOKEN_CONFIG.USER_ID_KEY);
    if (!userId) return null;

    return {
      userID: userId,
      email: localStorage.getItem(TOKEN_CONFIG.USER_EMAIL_KEY),
      fullName: localStorage.getItem(TOKEN_CONFIG.USER_FULL_NAME_KEY),
      role: localStorage.getItem(TOKEN_CONFIG.USER_ROLE_KEY),
      expiresAt: localStorage.getItem(TOKEN_CONFIG.EXPIRES_AT_KEY),
    };
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if token exists, false otherwise
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
  },

  /**
   * Clear all authentication data (logout)
   */
  clearAuthData: () => {
    try {
      localStorage.removeItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
      localStorage.removeItem(TOKEN_CONFIG.USER_ID_KEY);
      localStorage.removeItem(TOKEN_CONFIG.USER_EMAIL_KEY);
      localStorage.removeItem(TOKEN_CONFIG.USER_FULL_NAME_KEY);
      localStorage.removeItem(TOKEN_CONFIG.USER_ROLE_KEY);
      localStorage.removeItem(TOKEN_CONFIG.EXPIRES_AT_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },

  /**
   * Get authorization header object
   * @returns {Object} - Header object with Bearer token
   */
  getAuthHeader: () => {
    const token = tokenManager.getToken();
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  },
};

export default tokenManager;
