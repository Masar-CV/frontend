const InterviewScreen = ({
  answer,
  currentQuestion,
  questionNumber,
  totalQuestions,
  progressPercent,
  progressFillPercent,
  canGoNext,
  isAnalyzing,
  answerError,
  setAnswer,
  handleGoBack,
  handleNextQuestion,
}) => {
  const keyPoints = Array.isArray(currentQuestion?.key_points)
    ? currentQuestion.key_points
    : [];
  const tip = keyPoints[0] || currentQuestion?.skill_focus || 'Use specific examples and explain your reasoning clearly.';

  return (
  <section className="mi2-wrapper">
    <div className="mi2-progress">
      <div className="mi2-progress-top">
        <span>{`Question ${questionNumber} of ${totalQuestions}`}</span>
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
      <span className="mi2-badge">{currentQuestion?.category || 'Interview'}</span>
      <h2>{currentQuestion?.question}</h2>

      <div className="mi2-tip-box">
        <span className="mi2-tip-tag">Tip:</span>
        <span>{tip}</span>
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

      {answerError && <p className="mi2-error">{answerError}</p>}

      <div className="mi2-actions">
        <button
          type="button"
          className="mi2-prev-btn"
          disabled={isAnalyzing}
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
          {isAnalyzing
            ? 'Analyzing...'
            : questionNumber === totalQuestions
              ? 'Finish Interview'
              : 'Next Question'}
        </button>
      </div>
    </article>
  </section>
  );
};

export default InterviewScreen;
