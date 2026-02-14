/**
 * API Service - Main entry point for all API communication
 * Exports the configured HTTP client and auth service
 */

import httpClient from './httpClient';
import authService from './authService';

export { httpClient, authService };

export default httpClient;

