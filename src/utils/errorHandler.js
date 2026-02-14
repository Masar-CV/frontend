import { ERROR_MESSAGES } from './constants';

/**
 * Error Handler - Centralized error handling and formatting
 * Converts API errors to user-friendly messages
 */

const errorHandler = {
  /**
   * Parse API error response
   * @param {Error|AxiosError} error - Error object from API call
   * @returns {Object} - Formatted error object with message and details
   */
  parseError: (error) => {
    // Network error
    if (!error.response) {
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        type: 'network',
        status: null,
        details: error.message,
      };
    }

    const { status, data } = error.response;
    let message = ERROR_MESSAGES.UNKNOWN_ERROR;
    let details = null;

    // Handle validation errors (400)
    if (status === 400) {
      if (data.errors) {
        // Validation error with field details
        message = ERROR_MESSAGES.VALIDATION_ERROR;
        details = data.errors;
      } else if (data.message) {
        // Business logic error
        message = errorHandler.parseMessage(data.message);
      }
    }

    // Handle authentication errors (401)
    if (status === 401) {
      message = data.message ? errorHandler.parseMessage(data.message) : ERROR_MESSAGES.INVALID_CREDENTIALS;
    }

    // Handle server errors (5xx)
    if (status >= 500) {
      message = ERROR_MESSAGES.SERVER_ERROR;
    }

    return {
      message,
      type: `error_${status}`,
      status,
      details,
    };
  },

  /**
   * Parse bilingual message from API (English | Arabic)
   * Returns English version by default
   * @param {string} bilingual - Message in format "English | العربية"
   * @returns {string} - English message
   */
  parseMessage: (bilingual) => {
    if (!bilingual) return ERROR_MESSAGES.UNKNOWN_ERROR;

    // Split by | and get the first part (English)
    const parts = bilingual.split('|');
    return parts[0].trim() || ERROR_MESSAGES.UNKNOWN_ERROR;
  },

  /**
   * Get formatted error message for UI display
   * @param {Error|AxiosError} error - Error object
   * @returns {string} - User-friendly error message
   */
  getUiMessage: (error) => {
    const parsed = errorHandler.parseError(error);
    return parsed.message;
  },

  /**
   * Get validation errors formatted for form display
   * @param {Error|AxiosError} error - Error object
   * @returns {Object|null} - Validation errors object or null
   */
  getValidationErrors: (error) => {
    const parsed = errorHandler.parseError(error);
    return parsed.details || null;
  },

  /**
   * Log error for debugging (can be extended to send to analytics)
   * @param {string} context - Where the error occurred
   * @param {Error|AxiosError} error - Error object
   */
  logError: (context, error) => {
    const parsed = errorHandler.parseError(error);
    console.error(`[${context}]`, {
      message: parsed.message,
      status: parsed.status,
      details: parsed.details,
      original: error,
    });
  },
};

export default errorHandler;
