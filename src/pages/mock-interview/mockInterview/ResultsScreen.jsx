import {
  RESULT_IMPROVEMENTS,
  RESULT_QUESTIONS,
  RESULT_STRENGTHS,
} from './mockInterviewData';

const ResultsScreen = ({ overallScore, handleStartNewInterview }) => (
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
        <div
          className="mi3-overall-fill"
          style={{ width: `${overallScore}%` }}
        />
      </div>
      <p className="mi3-overall-note">
        Good job! Keep practicing to improve further.
      </p>
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
            <p className={`mi3-card-score mi3-card-score--${item.scoreTone}`}>
              {`${item.score}%`}
            </p>
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
      <button
        type="button"
        className="mi3-new-btn"
        onClick={handleStartNewInterview}
      >
        Start New Interview
      </button>
      <button type="button" className="mi3-save-btn">
        Save Results
      </button>
    </div>
  </section>
);

export default ResultsScreen;
