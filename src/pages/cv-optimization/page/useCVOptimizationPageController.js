import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import {
  useCVOptimization,
  OPTIMIZATION_STATUS,
} from '../../../features/cv-optimization';
import tokenManager from '../../../utils/tokenManager';

const useCVOptimizationPageController = () => {
  const navigate = useNavigate();
  const isAuthenticated = tokenManager.isAuthenticated();
  const user = tokenManager.getUser();

  const {
    selectedFile,
    status,
    progress,
    error,
    isLoading,
    handleFileSelect,
    handleFileRemove,
    handleOptimize,
  } = useCVOptimization();

  const handleAnalyze = async () => {
    const result = await handleOptimize();
    if (result) {
      navigate(ROUTES.cvOptimizationResults, { state: { result } });
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case OPTIMIZATION_STATUS.UPLOADING:
        return 'Uploading your CV...';
      case OPTIMIZATION_STATUS.PROCESSING:
        return 'Analyzing and optimizing your CV...';
      default:
        return null;
    }
  };

  return {
    isAuthenticated,
    user,
    selectedFile,
    progress,
    error,
    isLoading,
    statusMessage: getStatusMessage(),
    handleFileSelect,
    handleFileRemove,
    handleAnalyze,
  };
};

export default useCVOptimizationPageController;
