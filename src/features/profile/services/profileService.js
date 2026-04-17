import httpClient from '../../../services/httpClient';
import { API_CONFIG } from '../../../utils/constants';
import errorHandler from '../../../utils/errorHandler';

const ENDPOINTS = API_CONFIG.ENDPOINTS.PROFILE;

const parseDownloadFileName = (contentDisposition) => {
  if (!contentDisposition) return 'profile-cv';

  // Supports: filename="x.ext" and filename*=UTF-8''x.ext
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1]).replace(/["']/g, '');
    } catch {
      return utf8Match[1].replace(/["']/g, '');
    }
  }

  const basicMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (basicMatch?.[1]) return basicMatch[1];

  return 'profile-cv';
};

const profileService = {
  // --- Profile ---
  getProfile: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.GET);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getProfile', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await httpClient.put(ENDPOINTS.UPDATE, profileData);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateProfile', error);
      throw error;
    }
  },

  // --- About ---
  updateAbout: async (about) => {
    try {
      const response = await httpClient.put(ENDPOINTS.ABOUT, { about });
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateAbout', error);
      throw error;
    }
  },

  // --- Statistics ---
  getStatistics: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.STATISTICS);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getStatistics', error);
      throw error;
    }
  },

  // --- Skills CRUD ---
  getSkills: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.SKILLS);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getSkills', error);
      throw error;
    }
  },

  getSkillById: async (skillId) => {
    try {
      const response = await httpClient.get(`${ENDPOINTS.SKILLS}/${skillId}`);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getSkillById', error);
      throw error;
    }
  },

  createSkill: async ({ skillName, proficiencyLevel }) => {
    try {
      const response = await httpClient.post(ENDPOINTS.SKILLS, { skillName, proficiencyLevel });
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.createSkill', error);
      throw error;
    }
  },

  updateSkill: async (skillId, { skillName, proficiencyLevel }) => {
    try {
      const response = await httpClient.put(`${ENDPOINTS.SKILLS}/${skillId}`, { skillName, proficiencyLevel });
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateSkill', error);
      throw error;
    }
  },

  deleteSkill: async (skillId) => {
    try {
      await httpClient.delete(`${ENDPOINTS.SKILLS}/${skillId}`);
    } catch (error) {
      errorHandler.logError('profileService.deleteSkill', error);
      throw error;
    }
  },

  // --- Education ---
  getEducation: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.EDUCATION);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getEducation', error);
      throw error;
    }
  },

  createEducation: async (data) => {
    try {
      const response = await httpClient.post(ENDPOINTS.EDUCATION, data);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.createEducation', error);
      throw error;
    }
  },

  updateEducation: async (educationId, data) => {
    try {
      const response = await httpClient.put(`${ENDPOINTS.EDUCATION}/${educationId}`, data);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateEducation', error);
      throw error;
    }
  },

  // --- Certifications CRUD ---
  getCertifications: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.CERTIFICATIONS);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getCertifications', error);
      throw error;
    }
  },

  getCertificationById: async (certificationId) => {
    try {
      const response = await httpClient.get(`${ENDPOINTS.CERTIFICATIONS}/${certificationId}`);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getCertificationById', error);
      throw error;
    }
  },

  createCertification: async (data) => {
    try {
      const response = await httpClient.post(ENDPOINTS.CERTIFICATIONS, data);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.createCertification', error);
      throw error;
    }
  },

  updateCertification: async (certificationId, data) => {
    try {
      const response = await httpClient.put(`${ENDPOINTS.CERTIFICATIONS}/${certificationId}`, data);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateCertification', error);
      throw error;
    }
  },

  deleteCertification: async (certificationId) => {
    try {
      await httpClient.delete(`${ENDPOINTS.CERTIFICATIONS}/${certificationId}`);
    } catch (error) {
      errorHandler.logError('profileService.deleteCertification', error);
      throw error;
    }
  },

  // --- Quick Actions ---
  downloadProfileCV: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.CV_DOWNLOAD, { responseType: 'blob' });
      const contentDisposition = response.headers?.['content-disposition'];
      return {
        blob: response.data,
        fileName: parseDownloadFileName(contentDisposition),
      };
    } catch (error) {
      errorHandler.logError('profileService.downloadProfileCV', error);
      throw error;
    }
  },

  getEmailPreferences: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.EMAIL_PREFERENCES);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getEmailPreferences', error);
      throw error;
    }
  },

  updateEmailPreferences: async (preferences) => {
    try {
      const response = await httpClient.put(ENDPOINTS.EMAIL_PREFERENCES, preferences);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateEmailPreferences', error);
      throw error;
    }
  },

  // --- Experiences CRUD ---
  getExperiences: async () => {
    try {
      const response = await httpClient.get(ENDPOINTS.EXPERIENCES);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getExperiences', error);
      throw error;
    }
  },

  getExperienceById: async (expId) => {
    try {
      const response = await httpClient.get(`${ENDPOINTS.EXPERIENCES}/${expId}`);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.getExperienceById', error);
      throw error;
    }
  },

  createExperience: async (data) => {
    try {
      const response = await httpClient.post(ENDPOINTS.EXPERIENCES, data);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.createExperience', error);
      throw error;
    }
  },

  updateExperience: async (expId, data) => {
    try {
      const response = await httpClient.put(`${ENDPOINTS.EXPERIENCES}/${expId}`, data);
      return response.data;
    } catch (error) {
      errorHandler.logError('profileService.updateExperience', error);
      throw error;
    }
  },

  deleteExperience: async (expId) => {
    try {
      await httpClient.delete(`${ENDPOINTS.EXPERIENCES}/${expId}`);
    } catch (error) {
      errorHandler.logError('profileService.deleteExperience', error);
      throw error;
    }
  },
};

export default profileService;
