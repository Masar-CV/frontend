import MockInterviewView from './mockInterview/MockInterviewView';
import useMockInterviewController from './mockInterview/useMockInterviewController';
import './MockInterview.css';

const MockInterview = () => {
  const controller = useMockInterviewController();
  return <MockInterviewView {...controller} />;
};

export default MockInterview;
