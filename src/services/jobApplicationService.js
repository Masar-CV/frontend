import httpClient from './httpClient';
import { API_CONFIG } from '../utils/constants';
import errorHandler from '../utils/errorHandler';

export const JOB_APPLICATION_STATUS = {
  WISHLIST: 1,
  APPLIED: 2,
  INTERVIEW: 3,
  OFFER: 4,
  REJECTED: 5,
};

export const JOB_APPLICATION_STATUS_LABELS = {
  [JOB_APPLICATION_STATUS.WISHLIST]: 'Wishlist',
  [JOB_APPLICATION_STATUS.APPLIED]: 'Applied',
  [JOB_APPLICATION_STATUS.INTERVIEW]: 'Interview',
  [JOB_APPLICATION_STATUS.OFFER]: 'Offer',
  [JOB_APPLICATION_STATUS.REJECTED]: 'Rejected',
};

const toTrimmedString = (value) => value?.trim() || '';

const buildPayload = (application) => ({
  companyName: toTrimmedString(application.companyName),
  position: toTrimmedString(application.position),
  location: toTrimmedString(application.location),
  salaryRange: toTrimmedString(application.salaryRange),
  contactName: toTrimmedString(application.contactName),
  status: Number(application.status),
  notes: toTrimmedString(application.notes),
  appliedDate: application.appliedDate,
});

const getMutationErrorMessage = (error) => {
  const detail = error.response?.data?.detail;
  const title = error.response?.data?.title;

  return detail || title || errorHandler.getUiMessage(error);
};

const jobApplicationService = {
  list: async ({
    page = 1,
    pageSize = 20,
    status,
    sort = 'datecreated',
    sortDir = 'desc',
  } = {}) => {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.JOB_APPLICATIONS.LIST, {
        params: {
          page,
          pageSize,
          ...(status ? { status } : {}),
          sort,
          sortDir,
        },
      });

      return response.data;
    } catch (error) {
      errorHandler.logError('jobApplicationService.list', error);
      throw new Error(errorHandler.getUiMessage(error));
    }
  },

  summary: async () => {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.JOB_APPLICATIONS.SUMMARY);

      return response.data;
    } catch (error) {
      errorHandler.logError('jobApplicationService.summary', error);
      throw new Error(errorHandler.getUiMessage(error));
    }
  },

  recent: async ({ take = 10 } = {}) => {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.JOB_APPLICATIONS.RECENT, {
        params: { take },
      });

      return response.data;
    } catch (error) {
      errorHandler.logError('jobApplicationService.recent', error);
      throw new Error(errorHandler.getUiMessage(error));
    }
  },

  create: async (application) => {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.JOB_APPLICATIONS.CREATE,
        buildPayload(application)
      );

      return response.data;
    } catch (error) {
      errorHandler.logError('jobApplicationService.create', error);
      throw new Error(getMutationErrorMessage(error));
    }
  },

  update: async (id, application) => {
    try {
      const response = await httpClient.put(
        API_CONFIG.ENDPOINTS.JOB_APPLICATIONS.UPDATE(id),
        buildPayload(application)
      );

      return response.data;
    } catch (error) {
      errorHandler.logError('jobApplicationService.update', error);
      throw new Error(getMutationErrorMessage(error));
    }
  },

  delete: async (id) => {
    try {
      await httpClient.delete(API_CONFIG.ENDPOINTS.JOB_APPLICATIONS.DELETE(id));
    } catch (error) {
      errorHandler.logError('jobApplicationService.delete', error);
      throw new Error(getMutationErrorMessage(error));
    }
  },
};

export default jobApplicationService;
