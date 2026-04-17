import { useState } from 'react';
import { Link } from 'react-router-dom';
import micBotImage from '../../assets/images/mice.svg';
import './MockInterview.css';

const JOB_ROLE_OPTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'QA Engineer',
  'Product Manager',
];

const DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

const EXPECTATIONS = [
  '4 role-specific interview questions',
  'Mix of technical, behavioral, and problem-solving questions',
  'Instant AI-powered feedback on each answer',
  'Detailed performance report at the end',
];

const INTERVIEW_DATA = {
  totalQuestions: 4,
  questionIndex: 0,
  questionType: 'Technical',
  question: "Can you describe your experience with React and how you've used it in recent projects?",
  tip: 'Focus on specific projects, challenges you faced, and solutions you implemented.',
};

const RESULT_STRENGTHS = [
  'Clear communication',
  'Specific examples provided',
  'Good structure',
];

const RESULT_IMPROVEMENTS = [
  'Could elaborate more on technical details',
  'Add more quantifiable results',
];

const RESULT_QUESTIONS = [
  {
    id: 1,
    category: 'Technical',
    score: 72,
    scoreTone: 'info',
    prompt: "Can you describe your experience with React and how you've used it in recent projects?",
  },
  {
    id: 2,
    category: 'Behavioral',
    score: 71,
    scoreTone: 'info',
    prompt: 'How do you handle tight deadlines and prioritize tasks when working on multiple projects?',
  },
  {
    id: 3,
    category: 'Problem Solving',
    score: 86,
    scoreTone: 'strong',
    prompt: 'Explain a time when you had to debug a complex issue. What was your approach?',
  },
  {
    id: 4,
    category: 'Professional Development',
    score: 92,
    scoreTone: 'strong',
    prompt: 'What strategies do you use to stay updated with the latest web development trends?',
  },
];

const MockInterview = () => {
  const [jobRole, setJobRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [screen, setScreen] = useState('setup');
  const [answer, setAnswer] = useState('');

  const questionNumber = INTERVIEW_DATA.questionIndex + 1;
  const progressPercent = Math.round((questionNumber / INTERVIEW_DATA.totalQuestions) * 100);
  const progressFillPercent = 31.2;
  const canGoNext = answer.trim().length > 0;
  const overallScore = 80;

  const handleStartInterview = () => {
    setScreen('interview');
  };

  const handleGoBack = () => {
    setScreen('setup');
  };

  const handleNextQuestion = () => {
    if (!canGoNext) return;
    setScreen('results');
  };

  const handleStartNewInterview = () => {
    setAnswer('');
    setScreen('setup');
  };

  return (
    <div className="mi1-page">
      <header className="mi1-header">
        <div className="mi1-header-inner">
          <Link to="/" className="mi1-logo">MASAR</Link>

          <nav className="mi1-nav">
            <Link to="/">Home</Link>
            <Link to="/dashboard/resources">Resourses</Link>
            <button type="button" className="mi1-services-btn">Services <span>v</span></button>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/job-tracker">Job Tracker</Link>
            <Link to="/cv-optimization">CV Optimization</Link>
          </nav>

          <div className="mi1-auth">
            <Link to="/login" className="mi1-login">Log In</Link>
            <Link to="/register" className="mi1-started">Get Started</Link>
          </div>
        </div>
      </header>

      <main
        className={
          screen === 'setup'
            ? 'mi1-main'
            : screen === 'interview'
              ? 'mi2-main'
              : 'mi3-main'
        }
      >
        {screen === 'setup' && (
          <>
            <section className="mi1-hero">
              <div>
                <h1>Mock Interview</h1>
                <p>Practice with AI-generated interview questions tailored to your target role</p>
              </div>
              <img src={micBotImage} alt="AI interview assistant" />
            </section>

            <section className="mi1-card">
              <div className="mi1-card-head">
                <h2>Setup Your Interview</h2>
                <p>Choose your preferences to get started</p>
              </div>

              <div className="mi1-field">
                <label htmlFor="jobRole">Job Role</label>
                <select
                  id="jobRole"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                >
                  <option value="">Select a job role</option>
                  {JOB_ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="mi1-field">
                <label htmlFor="difficulty">Difficulty Level</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">Select difficulty</option>
                  {DIFFICULTY_OPTIONS.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="mi1-expect">
                <h3>What to Expect:</h3>
                <ul>
                  {EXPECTATIONS.map((item) => (
                    <li key={item}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M8 12.5l2.2 2.2L16 9" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="mi1-start-btn"
                onClick={handleStartInterview}
              >
                <span className="mi1-play">&gt;</span>
                Start Interview
              </button>
            </section>
          </>
        )}

        {screen === 'interview' && (
          <section className="mi2-wrapper">
            <div className="mi2-progress">
              <div className="mi2-progress-top">
                <span>{`Question ${questionNumber} of ${INTERVIEW_DATA.totalQuestions}`}</span>
                <span>{`${progressPercent}% Complete`}</span>
              </div>
              <div
                className="mi2-progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercent}
                aria-label="Interview progress"
              >
                <div
                  className="mi2-progress-fill"
                  style={{ width: `${progressFillPercent}%` }}
                />
              </div>
            </div>

            <article className="mi2-card">
              <span className="mi2-badge">{INTERVIEW_DATA.questionType}</span>
              <h2>{INTERVIEW_DATA.question}</h2>

              <div className="mi2-tip-box">
                <span className="mi2-tip-tag">Tip:</span>
                <span>{INTERVIEW_DATA.tip}</span>
              </div>

              <div className="mi2-answer-head">
                <label htmlFor="interviewAnswer">Your Answer</label>
                <button type="button" className="mi2-voice-btn" aria-label="Voice input">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
                    <path d="M6 11a6 6 0 0 0 12 0" />
                    <path d="M12 17v4" />
                  </svg>
                  Voice Input
                </button>
              </div>

              <textarea
                id="interviewAnswer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="mi2-answer-input"
              />

              <div className="mi2-actions">
                <button
                  type="button"
                  className="mi2-prev-btn"
                  onClick={handleGoBack}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="mi2-next-btn"
                  disabled={!canGoNext}
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              </div>
            </article>
          </section>
        )}

        {screen === 'results' && (
          <section className="mi3-wrapper">
            <div className="mi3-title">
              <h2>Interview Complete!</h2>
              <p>Here&apos;s your performance summary</p>
            </div>

            <article className="mi3-overall">
              <h3>Overall Performance</h3>
              <p className="mi3-overall-score">{`${overallScore}%`}</p>
              <div
                className="mi3-overall-track"
                role="progressbar"
                aria-label="Overall interview score"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={overallScore}
              >
                <div className="mi3-overall-fill" style={{ width: `${overallScore}%` }} />
              </div>
              <p className="mi3-overall-note">Good job! Keep practicing to improve further.</p>
            </article>

            <div className="mi3-list">
              {RESULT_QUESTIONS.map((item) => (
                <article key={item.id} className="mi3-card">
                  <div className="mi3-card-head">
                    <div>
                      <span className="mi3-card-tag">{item.category}</span>
                      <p className="mi3-card-qid">{`Question ${item.id}`}</p>
                      <p className="mi3-card-question">{item.prompt}</p>
                    </div>
                    <p className={`mi3-card-score mi3-card-score--${item.scoreTone}`}>{`${item.score}%`}</p>
                  </div>

                  <div className="mi3-card-answer">
                    <p>Your Answer:</p>
                    <div aria-hidden="true" />
                  </div>

                  <div className="mi3-feedback">
                    <div className="mi3-feedback-col">
                      <div className="mi3-feedback-head">
                        <svg viewBox="0 0 20 20" aria-hidden="true">
                          <circle cx="10" cy="10" r="8" />
                          <path d="M6.7 10.2l2 2 4.6-4.7" />
                        </svg>
                        <span>Strengths</span>
                      </div>
                      <ul className="mi3-feedback-list mi3-feedback-list--good">
                        {RESULT_STRENGTHS.map((entry) => (
                          <li key={`${item.id}-good-${entry}`}>{entry}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mi3-feedback-col">
                      <div className="mi3-feedback-head">
                        <svg viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M3.5 13h13" />
                          <path d="M10 7l3.5 3.5L10 14" />
                        </svg>
                        <span>Areas to Improve</span>
                      </div>
                      <ul className="mi3-feedback-list mi3-feedback-list--warn">
                        {RESULT_IMPROVEMENTS.map((entry) => (
                          <li key={`${item.id}-warn-${entry}`}>{entry}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mi3-actions">
              <button type="button" className="mi3-new-btn" onClick={handleStartNewInterview}>
                Start New Interview
              </button>
              <button type="button" className="mi3-save-btn">
                Save Results
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="mi1-footer">
        <div className="mi1-footer-inner">
          <div className="mi1-footer-brand">
            <h4>MASAR</h4>
            <p>AI-powered career development for ambitious professionals.</p>
          </div>

          <div className="mi1-footer-links">
            <div>
              <h5>Product</h5>
              <Link to="/dashboard/cv-analysis">CV Analysis</Link>
              <Link to="/dashboard/job-tracker">Job Tracker</Link>
              <Link to="/dashboard/mock-interview">Mock Interview</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div>
              <h5>Resources</h5>
              <Link to="/dashboard/resources">CV Templates</Link>
              <Link to="/dashboard/resources">Cover Letters</Link>
              <Link to="/dashboard/resources">Learning Paths</Link>
            </div>
            <div>
              <h5>Company</h5>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mi1-footer-line" />
        <p className="mi1-copyright">(c) 2025 MASAR. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MockInterview;
