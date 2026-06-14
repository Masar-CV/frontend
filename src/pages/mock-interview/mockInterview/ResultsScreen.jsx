const getScoreTone = (score) => (score >= 80 ? 'strong' : 'info');

const ResultsScreen = ({
  answers,
  answerAnalyses,
  questions,
  apiResult,
  overallScore,
  handleStartNewInterview,
}) => {
  const gap = apiResult?.gap;
  const missingSkills = Array.isArray(gap?.missing_skills) ? gap.missing_skills : [];
  const matchingSkills = Array.isArray(gap?.matching_skills) ? gap.matching_skills : [];
  const scoreTone = getScoreTone(overallScore);
  const scoreLabel = Number.isFinite(overallScore) ? `${overallScore}%` : 'N/A';
  const candidateName =
    apiResult?.cv_metadata?.candidate_name || gap?.cv_metadata?.candidate_name;

  return (
  <section className="mi3-wrapper">
    <div className="mi3-title">
      <h2>Interview Complete!</h2>
      <p>Here&apos;s your performance summary</p>
    </div>

    <article className="mi3-overall">
      <h3>Overall Performance</h3>
      <p className="mi3-overall-score">{scoreLabel}</p>
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
          style={{ width: `${Math.min(Math.max(overallScore || 0, 0), 100)}%` }}
        />
      </div>
      <p className="mi3-overall-note">
        {gap?.grade
          ? `${gap.grade}${candidateName ? ` match for ${candidateName}` : ''}`
          : 'Review the model answers and keep practicing.'}
      </p>
    </article>

    <div className="mi3-list">
      {questions.map((item, index) => (
        <article key={item.id ?? index} className="mi3-card">
          {(() => {
            const analysis = answerAnalyses[index] || {};
            const itemScore = Number(analysis.score);
            const itemScoreLabel = Number.isFinite(itemScore) ? `${Math.round(itemScore)}%` : scoreLabel;
            const itemScoreTone = getScoreTone(Number.isFinite(itemScore) ? itemScore : overallScore);
            const courses = Array.isArray(analysis.recommended_courses)
              ? analysis.recommended_courses
              : [];

            return (
          <>
          <div className="mi3-card-head">
            <div>
              <span className="mi3-card-tag">{item.category}</span>
              <p className="mi3-card-qid">{`Question ${index + 1}`}</p>
              <p className="mi3-card-question">{item.question}</p>
              {analysis.verdict && (
                <p className="mi3-card-verdict">{analysis.verdict}</p>
              )}
            </div>
            <p className={`mi3-card-score mi3-card-score--${itemScoreTone}`}>
              {itemScoreLabel}
            </p>
          </div>

          <div className="mi3-card-answer">
            <p>Your Answer:</p>
            <div>{answers[index] || 'No answer submitted.'}</div>
          </div>

          <div className="mi3-feedback">
            <div className="mi3-feedback-col">
              <div className="mi3-feedback-head">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M6.7 10.2l2 2 4.6-4.7" />
                </svg>
                <span>Model Answer</span>
              </div>
              <p className="mi3-model-answer">
                {analysis.what_was_right || item.model_answer || 'No model answer was provided.'}
              </p>
            </div>

            <div className="mi3-feedback-col">
              <div className="mi3-feedback-head">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M3.5 13h13" />
                  <path d="M10 7l3.5 3.5L10 14" />
                </svg>
                <span>Key Points</span>
              </div>
              <ul className="mi3-feedback-list mi3-feedback-list--warn">
                {[
                  analysis.what_was_missing,
                  analysis.how_to_improve,
                  ...(item.key_points || []),
                ].filter(Boolean).map((entry) => (
                  <li key={`${item.id ?? index}-point-${entry}`}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>

          {courses.length > 0 && (
            <div className="mi3-courses">
              <p>Recommended Courses</p>
              <ul>
                {courses.map((course) => (
                  <li key={`${item.id ?? index}-${course.skill}-${course.title}`}>
                    <a href={course.url} target="_blank" rel="noreferrer">
                      {course.title}
                    </a>
                    <span>{course.provider}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </>
            );
          })()}
        </article>
      ))}
    </div>

    {(matchingSkills.length > 0 || missingSkills.length > 0) && (
      <article className="mi3-card mi3-gap-card">
        <div className="mi3-feedback">
          <div className="mi3-feedback-col">
            <div className="mi3-feedback-head">
              <span>Matching Skills</span>
            </div>
            <ul className="mi3-feedback-list mi3-feedback-list--good">
              {matchingSkills.map((skill) => (
                <li key={`match-${skill}`}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mi3-feedback-col">
            <div className="mi3-feedback-head">
              <span>Missing Skills</span>
            </div>
            <ul className="mi3-feedback-list mi3-feedback-list--warn">
              {missingSkills.map((skill) => (
                <li key={`missing-${skill}`}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    )}

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
};

export default ResultsScreen;
