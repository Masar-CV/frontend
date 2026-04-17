import { useState, useEffect } from 'react';
import profileService from '../services/profileService';

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const normalizeStatistics = (payload) => {
  const raw = payload?.data && typeof payload.data === 'object' ? payload.data : payload;

  return {
    applicationsCount: toNumber(raw?.applicationsCount ?? raw?.applications),
    interviewsCount: toNumber(raw?.interviewsCount ?? raw?.interviews),
    cvDownloadsCount: toNumber(raw?.cvDownloadsCount ?? raw?.cvDownloads),
    profileCompletionPercentage: toNumber(raw?.profileCompletionPercentage ?? raw?.profileCompletion),
  };
};

const useStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    profileService.getStatistics()
      .then((stats) => setStatistics(normalizeStatistics(stats)))
      .catch(() => {});
  }, []);

  return { statistics };
};

export default useStatistics;
