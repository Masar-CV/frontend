import CVAnalysisFormView from './CVAnalysisFormView';
import CVAnalysisResultsView from './CVAnalysisResultsView';

const CVAnalysisView = (props) => (
  <div className="cv-analysis-screen">
    {!props.computed ? (
      <CVAnalysisFormView {...props} />
    ) : (
      <CVAnalysisResultsView {...props} />
    )}
  </div>
);

export default CVAnalysisView;
