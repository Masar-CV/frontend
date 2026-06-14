import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import { useCVOptimization } from '../../../features/cv-optimization';

const useCVOptimizationResultsController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, setResultData, handleDownload } = useCVOptimization();

  useEffect(() => {
    if (location.state?.result) {
      setResultData(location.state.result);
    } else if (!result) {
      navigate(ROUTES.cvOptimization);
    }
  }, [location.state, result, setResultData, navigate]);

  const data = location.state?.result || result;
  const downloadResult = () => {
    handleDownload(data?.optimizationId, data?.fileName);
  };

  return {
    data,
    handleDownload: downloadResult,
  };
};

export default useCVOptimizationResultsController;
