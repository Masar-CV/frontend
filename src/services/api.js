/**
 * API Service - Main entry point for all API communication
 * Exports the configured HTTP client and auth service
 */

import httpClient from './httpClient';
import authService from './authService';
import jobApplicationService from './jobApplicationService';

export { httpClient, authService, jobApplicationService };

export default httpClient;

