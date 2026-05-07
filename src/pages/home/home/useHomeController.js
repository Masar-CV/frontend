import { useEffect, useState } from 'react';
import tokenManager from '../../../utils/tokenManager';

const useHomeController = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    tokenManager.isAuthenticated()
  );

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(tokenManager.isAuthenticated());
    };

    window.addEventListener('storage', syncAuthState);
    window.addEventListener('auth-changed', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('auth-changed', syncAuthState);
    };
  }, []);

  return {
    isAuthenticated,
  };
};

export default useHomeController;
