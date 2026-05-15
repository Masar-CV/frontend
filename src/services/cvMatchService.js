import httpClient from './httpClient';
import { API_CONFIG } from '../utils/constants';
import errorHandler from '../utils/errorHandler';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const validateInput = (file, jobDescription) => {
  if (!file) {
    throw new Error('Please upload your CV file.');
  }

  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  if (!ALLOWED_TYPES.includes(file.type) && !['.pdf', '.doc', '.docx'].includes(extension)) {
    throw new Error('Invalid file type. Upload PDF, DOC, or DOCX.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File is too large. Maximum allowed size is 5MB.');
  }

  if (!jobDescription?.trim()) {
    throw new Error('Please paste the job description before analyzing.');
  }
};

const getApiProblemMessage = (error) => {
  const data = error.response?.data;
  return data?.detail || data?.title || errorHandler.getUiMessage(error);
};

const cvMatchService = {
  matchCV: async ({ file, jobDescription }) => {
    validateInput(file, jobDescription);

    const formData = new FormData();
    formData.append('cvFile', file);
    formData.append('jobDescription', jobDescription.trim());

    try {
      const response = await httpClient.post(API_CONFIG.ENDPOINTS.CV.MATCH, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes for analysis
      });

      return response.data;
    } catch (error) {
      errorHandler.logError('cvMatchService.matchCV', error);
      throw new Error(getApiProblemMessage(error));
    }
  },

  getHistory: async () => {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.CV.MATCH_HISTORY);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      errorHandler.logError('cvMatchService.getHistory', error);
      throw new Error(getApiProblemMessage(error));
    }
  },

  getById: async (id) => {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.CV.MATCH_DETAILS(id));
      return response.data;
    } catch (error) {
      errorHandler.logError('cvMatchService.getById', error);
      throw new Error(getApiProblemMessage(error));
    }
  },
};

export default cvMatchService;
