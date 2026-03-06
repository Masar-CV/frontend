import { useState, useEffect } from 'react';
import profileService from '../services/profileService';

const useStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    profileService.getStatistics()
      .then((stats) => setStatistics(stats))
      .catch(() => {});
  }, []);

  return { statistics };
};

export default useStatistics;
