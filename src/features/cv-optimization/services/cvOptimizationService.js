/**
 * CV Optimization API Service
 * Handles all HTTP requests related to CV optimization
 */

import tokenManager from '../../../utils/tokenManager';

const API_BASE_URL = 'https://masar-api-emhwehcgh5a8bwhh.italynorth-01.azurewebsites.net';

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

      xhr.open('POST', `${API_BASE_URL}/api/cv/optimize`);
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
 * Downloads the optimized CV
 * @param {string} downloadUrl - The download URL from the API response
 * @param {string} fileName - The filename for the download
 */
export const downloadOptimizedCV = async (downloadUrl, fileName) => {
  try {
    const fullUrl = downloadUrl.startsWith('http') 
      ? downloadUrl 
      : `${API_BASE_URL}${downloadUrl}`;

    const headers = tokenManager.getAuthHeader();
    const response = await fetch(fullUrl, { headers });
    
    if (!response.ok) {
      throw new CVOptimizationError('Failed to download file', response.status);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'optimized-cv.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (error instanceof CVOptimizationError) {
      throw error;
    }
    throw new CVOptimizationError('Failed to download the optimized CV');
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
      throw new CVOptimizationError('Failed to fetch optimization result', response.status);
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
