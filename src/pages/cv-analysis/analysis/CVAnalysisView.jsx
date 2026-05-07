import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';
import CVAnalysisFormView from './CVAnalysisFormView';
import CVAnalysisResultsView from './CVAnalysisResultsView';

const CVAnalysisView = (props) => (
  <div className="cv-analysis-screen">
    <Navbar />

    {!props.computed ? (
      <CVAnalysisFormView {...props} />
    ) : (
      <CVAnalysisResultsView {...props} />
    )}

    <Footer />
  </div>
);

export default CVAnalysisView;
