import { INTERVIEW_DATA } from './mockInterviewData';

const InterviewScreen = ({
  answer,
  questionNumber,
  progressPercent,
  progressFillPercent,
  canGoNext,
  setAnswer,
  handleGoBack,
  handleNextQuestion,
}) => (
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
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Type your answer here..."
        className="mi2-answer-input"
      />

      <div className="mi2-actions">
        <button type="button" className="mi2-prev-btn" onClick={handleGoBack}>
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
);

export default InterviewScreen;
