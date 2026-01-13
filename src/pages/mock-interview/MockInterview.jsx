import './MockInterview.css';

const MockInterview = () => {
  return (
    <div className="mock-interview">
      <div className="mock-interview-header">
        <h1 className="page-title">Mock Interview</h1>
        <p className="page-subtitle">Practice your interview skills with AI</p>
      </div>

      <div className="mock-interview-content">
        <div className="interview-container">
          <div className="question-section">
            <h2 className="section-title">Interview Question</h2>
            <div className="question-box">
              <p className="question-text">Ready to start? Click the button below to begin your mock interview.</p>
            </div>
          </div>

          <div className="controls-section">
            <button type="button" className="btn btn-primary">Start Interview</button>
            <button type="button" className="btn btn-secondary">End Interview</button>
          </div>

          <div className="feedback-section">
            <h2 className="section-title">Feedback</h2>
            <p className="placeholder-text">Complete an interview to see feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;

