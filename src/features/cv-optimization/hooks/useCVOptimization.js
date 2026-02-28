import { useState, useCallback } from 'react';
import { optimizeCV, downloadOptimizedCV, CVOptimizationError } from '../services/cvOptimizationService';
import { OPTIMIZATION_STATUS } from '../types';

/**
 * Custom hook for CV optimization state management
 * Handles file selection, upload, processing states, and results
 */
const useCVOptimization = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(OPTIMIZATION_STATUS.IDLE);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handles file selection
   * @param {File} file - The selected file
   */
  const handleFileSelect = useCallback((file) => {
    setSelectedFile(file);
    setError(null);
    setStatus(OPTIMIZATION_STATUS.IDLE);
    setResult(null);
  }, []);

  /**
   * Handles file removal/reset
   */
  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    setStatus(OPTIMIZATION_STATUS.IDLE);
    setProgress(0);
    setResult(null);
  }, []);

  /**
   * Handles the CV optimization process
   * @returns {Promise<import('../types').CVOptimizationResponse|null>}
   */
  const handleOptimize = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return null;
    }

    try {
      setError(null);
      setStatus(OPTIMIZATION_STATUS.UPLOADING);
      setProgress(0);

      const onProgress = (percent) => {
        setProgress(percent);
        if (percent >= 50) {
          setStatus(OPTIMIZATION_STATUS.PROCESSING);
        }
      };

      const response = await optimizeCV(selectedFile, onProgress);
      
      setResult(response);
      setStatus(OPTIMIZATION_STATUS.SUCCESS);
      setProgress(100);
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof CVOptimizationError 
        ? err.message 
        : 'An unexpected error occurred. Please try again.';
      
      setError(errorMessage);
      setStatus(OPTIMIZATION_STATUS.ERROR);
      setProgress(0);
      
      return null;
    }
  }, [selectedFile]);

  /**
   * Downloads the optimized CV
   */
  const handleDownload = useCallback(async () => {
    if (!result?.downloadUrl) {
      setError('No download available');
      return;
    }

    try {
      await downloadOptimizedCV(result.downloadUrl, result.fileName);
    } catch (err) {
      setError(err.message || 'Failed to download file');
    }
  }, [result]);

  /**
   * Resets the entire state
   */
  const reset = useCallback(() => {
    setSelectedFile(null);
    setStatus(OPTIMIZATION_STATUS.IDLE);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  /**
   * Sets result directly (useful when navigating with state)
   * @param {import('../types').CVOptimizationResponse} data
   */
  const setResultData = useCallback((data) => {
    setResult(data);
    setStatus(OPTIMIZATION_STATUS.SUCCESS);
  }, []);

  return {
    // State
    selectedFile,
    status,
    progress,
    result,
    error,
    
    // Computed
    isIdle: status === OPTIMIZATION_STATUS.IDLE,
    isUploading: status === OPTIMIZATION_STATUS.UPLOADING,
    isProcessing: status === OPTIMIZATION_STATUS.PROCESSING,
    isLoading: status === OPTIMIZATION_STATUS.UPLOADING || status === OPTIMIZATION_STATUS.PROCESSING,
    isSuccess: status === OPTIMIZATION_STATUS.SUCCESS,
    isError: status === OPTIMIZATION_STATUS.ERROR,
    hasFile: !!selectedFile,
    hasResult: !!result,
    
    // Actions
    handleFileSelect,
    handleFileRemove,
    handleOptimize,
    handleDownload,
    setResultData,
    reset
  };
};

export default useCVOptimization;
