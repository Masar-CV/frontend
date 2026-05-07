import CVOptimizationPageView from './page/CVOptimizationPageView';
import useCVOptimizationPageController from './page/useCVOptimizationPageController';
import './CVOptimizationPage.css';

const CVOptimizationPage = () => {
  const controller = useCVOptimizationPageController();
  return <CVOptimizationPageView {...controller} />;
};

export default CVOptimizationPage;
