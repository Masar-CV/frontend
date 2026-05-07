import CVAnalysisView from './analysis/CVAnalysisView';
import useCVAnalysisController from './analysis/useCVAnalysisController';
import './CVAnalysis.css';

const CVAnalysis = () => {
  const controller = useCVAnalysisController();
  return <CVAnalysisView {...controller} />;
};

export default CVAnalysis;
