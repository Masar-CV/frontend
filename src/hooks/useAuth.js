import { useCallback } from 'react';
import authService from '../services/authService';
import errorHandler from '../utils/errorHandler';
import tokenManager from '../utils/tokenManager';

/**
 * useAuth Hook - Provides authentication functionality
 * Simplifies authentication operations in components
 */
export const useAuth = () => {
  /**
   * Login user
   */
  const login = useCallback(async (email, password) => {
    try {
      const response = await authService.login(email, password);
      return {
        success: true,
        data: response,
        error: null,
      };
    } catch (error) {
      const message = errorHandler.getUiMessage(error);
      errorHandler.logError('useAuth.login', error);
      return {
        success: false,
        data: null,
        error: message,
      };
    }
  }, []);

  /**
   * Register user
   */
  const register = useCallback(async (userData) => {
    try {
      const response = await authService.register(userData);
      return {
        success: true,
        data: response,
        error: null,
      };
    } catch (error) {
      const message = errorHandler.getUiMessage(error);
      errorHandler.logError('useAuth.register', error);
      return {
        success: false,
        data: null,
        error: message,
      };
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    authService.logout();
  }, []);

  /**
   * Get current user
   */
  const getUser = useCallback(() => {
    return tokenManager.getUser();
  }, []);

  /**
   * Check if authenticated
   */
  const isAuthenticated = useCallback(() => {
    return tokenManager.isAuthenticated();
  }, []);

  /**
   * Get auth token
   */
  const getToken = useCallback(() => {
    return tokenManager.getToken();
  }, []);

  return {
    login,
    register,
    logout,
    getUser,
    isAuthenticated,
    getToken,
  };
};

export default useAuth;
