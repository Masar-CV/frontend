import httpClient from './httpClient';
import { API_CONFIG } from '../utils/constants';
import errorHandler from '../utils/errorHandler';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

const validateInput = ({ file, jobDescription }) => {
  if (!file) {
    throw new Error('Please upload your CV file.');
  }

  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error('Invalid file type. Upload PDF, DOC, or DOCX.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File is too large. Maximum allowed size is 10MB.');
  }

  if (!jobDescription?.trim()) {
    throw new Error('Please paste the job description.');
  }
};

const getApiProblemMessage = (error) => {
  const data = error.response?.data;
  return data?.detail || data?.title || data?.message || errorHandler.getUiMessage(error);
};

const mockInterviewService = {
  generateQuestions: async ({ file, jobDescription }) => {
    validateInput({ file, jobDescription });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription.trim());

    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.CV.MOCK_GENERATE_QUESTIONS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 120000,
        }
      );

      return response.data;
    } catch (error) {
      errorHandler.logError('mockInterviewService.generateQuestions', error);
      throw new Error(getApiProblemMessage(error));
    }
  },

  analyzeAnswer: async ({ userAnswer, questionData }) => {
    if (!userAnswer?.trim()) {
      throw new Error('Please enter your answer before continuing.');
    }

    if (!questionData) {
      throw new Error('Question data is missing. Please restart the interview.');
    }

    const formData = new FormData();
    formData.append('userAnswer', userAnswer.trim());
    formData.append('questionData', JSON.stringify(questionData));

    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.CV.MOCK_ANALYZE_ANSWER,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 120000,
        }
      );

      return response.data;
    } catch (error) {
      errorHandler.logError('mockInterviewService.analyzeAnswer', error);
      throw new Error(getApiProblemMessage(error));
    }
  },
};

export default mockInterviewService;
