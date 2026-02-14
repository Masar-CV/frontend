import httpClient from './httpClient';
import { API_CONFIG } from '../utils/constants';
import tokenManager from '../utils/tokenManager';
import errorHandler from '../utils/errorHandler';

/**
 * Auth Service - Manages all authentication API calls
 * Single responsibility: Handle authentication operations
 */

const authService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data with token
   * @throws {Error} - If login fails
   */
  login: async (email, password) => {
    try {
      const response = await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      // Save token and user data
      tokenManager.saveAuthData(response.data);

      return response.data;
    } catch (error) {
      errorHandler.logError('authService.login', error);
      throw error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.fullName - User full name
   * @param {string} userData.role - User role (Student|Admin)
   * @returns {Promise<Object>} - User data with token
   * @throws {Error} - If registration fails
   */
  register: async (userData) => {
    try {
      const response = await httpClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        role: userData.role || 'Student',
      });

      // Save token and user data
      tokenManager.saveAuthData(response.data);

      return response.data;
    } catch (error) {
      errorHandler.logError('authService.register', error);
      throw error;
    }
  },

  /**
   * Request password reset OTP
   * @param {string} email - User email
   * @returns {Promise<Object>} - API response
   * @throws {Error} - If request fails
   */
  requestPasswordReset: async (email) => {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );
      return response.data;
    } catch (error) {
      errorHandler.logError('authService.requestPasswordReset', error);
      throw error;
    }
  },

  /**
   * Verify OTP code
   * @param {string} email - User email
   * @param {string} otpCode - 6-digit OTP code
   * @returns {Promise<Object>} - API response
   * @throws {Error} - If verification fails
   */
  verifyOtp: async (email, otpCode) => {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
        { email, otpCode }
      );
      return response.data;
    } catch (error) {
      errorHandler.logError('authService.verifyOtp', error);
      throw error;
    }
  },

  /**
   * Reset password with verified OTP
   * @param {string} email - User email
   * @param {string} otpCode - Verified OTP code
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - API response
   * @throws {Error} - If reset fails
   */
  resetPassword: async (email, otpCode, newPassword) => {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD,
        { email, otpCode, newPassword }
      );
      return response.data;
    } catch (error) {
      errorHandler.logError('authService.resetPassword', error);
      throw error;
    }
  },

  /**
   * Logout user (clear stored data)
   */
  logout: () => {
    tokenManager.clearAuthData();
  },

  /**
   * Check if user is logged in
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated: () => {
    return tokenManager.isAuthenticated();
  },

  /**
   * Get current user data
   * @returns {Object|null} - User data or null
   */
  getCurrentUser: () => {
    return tokenManager.getUser();
  },
};

export default authService;
