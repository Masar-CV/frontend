import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCVOptimization } from '../../../features/cv-optimization';

const useCVOptimizationResultsController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, setResultData, handleDownload } = useCVOptimization();

  useEffect(() => {
    if (location.state?.result) {
      setResultData(location.state.result);
    } else if (!result) {
      navigate('/cv-optimization');
    }
  }, [location.state, result, setResultData, navigate]);

  const data = location.state?.result || result;

  return {
    data,
    handleDownload,
  };
};

export default useCVOptimizationResultsController;
