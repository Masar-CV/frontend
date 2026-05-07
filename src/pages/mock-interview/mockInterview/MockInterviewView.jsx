import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';
import InterviewScreen from './InterviewScreen';
import ResultsScreen from './ResultsScreen';
import SetupScreen from './SetupScreen';

const mainClassByScreen = {
  setup: 'mi1-main',
  interview: 'mi2-main',
  results: 'mi3-main',
};

const MockInterviewView = (props) => (
  <div className="mi1-page">
    <Navbar />

    <main className={mainClassByScreen[props.screen]}>
      {props.screen === 'setup' && <SetupScreen {...props} />}
      {props.screen === 'interview' && <InterviewScreen {...props} />}
      {props.screen === 'results' && <ResultsScreen {...props} />}
    </main>

    <Footer />
  </div>
);

export default MockInterviewView;
