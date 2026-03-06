import httpClient from '../../../services/httpClient';
import { API_CONFIG } from '../../../utils/constants';
import errorHandler from '../../../utils/errorHandler';

const ENDPOINTS = API_CONFIG.ENDPOINTS.PROFILE;

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
