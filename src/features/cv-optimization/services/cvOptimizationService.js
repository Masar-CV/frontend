/**
 * CV Optimization API Service
 * Handles all HTTP requests related to CV optimization
 */

import tokenManager from '../../../utils/tokenManager';
import { API_CONFIG } from '../../../utils/constants';

const API_BASE_URL = API_CONFIG.BASE_URL;
const ENDPOINTS = API_CONFIG.ENDPOINTS.CV;

/**
 * Custom error class for API errors
 */
export class CVOptimizationError extends Error {
  constructor(message, statusCode = null, details = null) {
    super(message);
    this.name = 'CVOptimizationError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Validates the file before upload
 * @param {File} file - The file to validate
 * @throws {CVOptimizationError} If validation fails
 */
const validateFile = (file) => {
  if (!file) {
    throw new CVOptimizationError('No file provided');
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));

  if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
    throw new CVOptimizationError(
      'Invalid file type. Please upload a PDF or Word document.',
      400
    );
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new CVOptimizationError(
      'File size exceeds 10MB limit.',
      400
    );
  }
};

const parseDownloadFileName = (contentDisposition, fallback = 'saved-cv.docx') => {
  if (!contentDisposition) return fallback;

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1]).replace(/["']/g, '');
    } catch {
      return utf8Match[1].replace(/["']/g, '');
    }
  }

  const basicMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  return basicMatch?.[1] || fallback;
};

const getProblemDetailsMessage = async (response, fallbackMessage) => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return fallbackMessage;
  }

  try {
    const errorData = await response.json();
    return errorData.detail || errorData.title || errorData.message || errorData.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const triggerBrowserDownload = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || 'saved-cv.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Uploads and optimizes a CV file
 * @param {File} file - The CV file to optimize
 * @param {function} onProgress - Progress callback (0-100)
 * @returns {Promise<import('../types').CVOptimizationResponse>}
 * @throws {CVOptimizationError}
 */
export const optimizeCV = async (file, onProgress = null) => {
  try {
    validateFile(file);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    
    const response = await new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 50);
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (parseError) {
            reject(new CVOptimizationError('Failed to parse server response'));
          }
        } else if (xhr.status === 401) {
          reject(new CVOptimizationError(
            'Please login to use CV optimization.',
            401
          ));
        } else {
          let errorMessage = 'Failed to optimize CV';
          try {
            const errorData = JSON.parse(xhr.responseText);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch {
            // Use default error message
          }
          reject(new CVOptimizationError(errorMessage, xhr.status));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new CVOptimizationError('Network error. Please check your connection.'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new CVOptimizationError('Request timed out. Please try again.'));
      });

      xhr.open('POST', `${API_BASE_URL}${ENDPOINTS.OPTIMIZE}`);
      xhr.timeout = 120000; // 2 minutes timeout
      
      // Add Authorization header if token exists
      const token = tokenManager.getToken();
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      xhr.send(formData);
    });

    if (onProgress) {
      onProgress(100);
    }

    return response;
  } catch (error) {
    if (error instanceof CVOptimizationError) {
      throw error;
    }
    throw new CVOptimizationError(
      error.message || 'An unexpected error occurred',
      null,
      error
    );
  }
};

/**
 * Downloads a saved CV from a fixed API endpoint.
 * @param {string|null} optimizationId - Optional optimization ID for result-specific downloads
 * @param {string} fileName - The filename for the download
 */
export const downloadOptimizedCV = async (optimizationId = null, fileName = 'saved-cv.docx') => {
  try {
    const endpoint = optimizationId
      ? ENDPOINTS.OPTIMIZATION_DOWNLOAD(optimizationId)
      : ENDPOINTS.DOWNLOAD;
    const headers = tokenManager.getAuthHeader();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    
    if (!response.ok) {
      const errorMessage = await getProblemDetailsMessage(response, 'Failed to download file');
      throw new CVOptimizationError(errorMessage, response.status);
    }

    const blob = await response.blob();
    const responseFileName = parseDownloadFileName(
      response.headers.get('content-disposition'),
      fileName
    );
    triggerBrowserDownload(blob, responseFileName);
  } catch (error) {
    if (error instanceof CVOptimizationError) {
      throw error;
    }
    throw new CVOptimizationError('Failed to download the saved CV');
  }
};

/**
 * Fetches optimization result by ID
 * @param {number} optimizationId - The optimization ID
 * @returns {Promise<import('../types').CVOptimizationResponse>}
 */
export const getOptimizationById = async (optimizationId) => {
  try {
    const headers = tokenManager.getAuthHeader();
    const response = await fetch(`${API_BASE_URL}/api/cv/optimizations/${optimizationId}`, {
      headers
    });
    
    if (!response.ok) {
      const errorMessage = await getProblemDetailsMessage(response, 'Failed to fetch optimization result');
      throw new CVOptimizationError(errorMessage, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof CVOptimizationError) {
      throw error;
    }
    throw new CVOptimizationError('Failed to fetch optimization result');
  }
};

export default {
  optimizeCV,
  downloadOptimizedCV,
  getOptimizationById
};
