import CVOptimizationResultsPageView from './results/CVOptimizationResultsPageView';
import useCVOptimizationResultsController from './results/useCVOptimizationResultsController';
import './CVOptimizationResultsPage.css';

const CVOptimizationResultsPage = () => {
  const controller = useCVOptimizationResultsController();
  return <CVOptimizationResultsPageView {...controller} />;
};

export default CVOptimizationResultsPage;
