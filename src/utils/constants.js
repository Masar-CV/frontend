// Application constants
export const APP_NAME = 'Masar';

// ============================================
// API Configuration
// ============================================
// By default, use relative /api URLs:
// - local dev is handled by the Vite proxy in vite.config.js
// - Vercel is handled by rewrites in vercel.json
// Set VITE_API_BASE_URL only if you want the browser to call an API origin directly.
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
const fallbackApiUrl = 'https://masar-api-emhwehcgh5a8bwhh.italynorth-01.azurewebsites.net';

export const API_CONFIG = {
  BASE_URL: configuredApiBaseUrl,
  FULL_API_URL: configuredApiBaseUrl || fallbackApiUrl,
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      GOOGLE: '/api/Auth/google',
      REGISTER: '/api/auth/register',
      FORGOT_PASSWORD: '/api/auth/forgot-password',
      VERIFY_OTP: '/api/auth/verify-otp',
      RESET_PASSWORD: '/api/auth/reset-password',
    },
    CV: {
      OPTIMIZE: '/api/cv/optimize',
      DOWNLOAD: '/api/cv/download',
      OPTIMIZATION_DOWNLOAD: (id) => `/api/cv/optimizations/${id}/download`,
      MATCH: '/api/cv-jd-match',
      MATCH_HISTORY: '/api/cv-jd-match/history',
      MATCH_DETAILS: (id) => `/api/cv-jd-match/${id}`,
      MOCK_GENERATE_QUESTIONS: '/api/cv/mock/generate-questions',
      MOCK_ANALYZE_ANSWER: '/api/cv/mock/analyze-answer',
    },
    PROFILE: {
      GET: '/api/profile',
      UPDATE: '/api/profile',
      ABOUT: '/api/profile/about',
      STATISTICS: '/api/profile/statistics',
      SKILLS: '/api/profile/skills',
      EXPERIENCES: '/api/profile/experiences',
      EDUCATION: '/api/profile/education',
      CERTIFICATIONS: '/api/profile/certifications',
      CV_DOWNLOAD: '/api/profile/cv/download',
      EMAIL_PREFERENCES: '/api/profile/email-preferences',
    },
    JOB_APPLICATIONS: {
      LIST: '/api/job-applications',
      RECENT: '/api/job-applications/recent',
      CREATE: '/api/job-applications',
      UPDATE: (id) => `/api/job-applications/${id}`,
      DELETE: (id) => `/api/job-applications/${id}`,
      SUMMARY: '/api/job-applications/summary',
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
  GOOGLE_LOGIN_SUCCESS: 'Google sign-in successful!',
  PASSWORD_RESET_SENT: 'Password reset link has been sent to your email.',
};

export const GOOGLE_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  SCRIPT_URL: 'https://accounts.google.com/gsi/client',
  SCOPES: 'openid email profile',
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

