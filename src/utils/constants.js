// Application constants
export const APP_NAME = 'Masar';

// ============================================
// API Configuration
// ============================================
export const API_CONFIG = {
  BASE_URL: 'https://masar-api-emhwehcgh5a8bwhh.italynorth-01.azurewebsites.net',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      FORGOT_PASSWORD: '/api/auth/forgot-password',
      VERIFY_OTP: '/api/auth/verify-otp',
      RESET_PASSWORD: '/api/auth/reset-password',
    },
  },
};

// Token Configuration
export const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'authToken',
  USER_ID_KEY: 'userId',
  USER_EMAIL_KEY: 'userEmail',
  USER_FULL_NAME_KEY: 'userFullName',
  USER_ROLE_KEY: 'userRole',
  EXPIRES_AT_KEY: 'tokenExpiresAt',
};

// Role Constants
export const USER_ROLES = {
  STUDENT: 'Student',
  ADMIN: 'Admin',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'User with this email already exists.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
  TOKEN_EXPIRED: 'Your session has expired. Please login again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  PASSWORD_RESET_SENT: 'Password reset link has been sent to your email.',
};

// Legacy API endpoints (keep for compatibility)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  DASHBOARD: {
    DATA: '/dashboard',
  },
  // Add more endpoints as needed
};

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  NOTIFICATIONS: '/dashboard/notifications',
  CV_ANALYSIS: '/dashboard/cv-analysis',
  CAREER_DEVELOPMENT: '/dashboard/career-development',
  RESOURCES_LIBRARY: '/dashboard/resources-library',
  MOCK_INTERVIEW: '/dashboard/mock-interview',
  JOB_TRACKER: '/dashboard/job-tracker',
};

