const scoreMetrics = (computed) => [
  { label: 'Hard Skill (Exact)', value: computed.hardSkillExact },
  { label: 'Hard Skill (With Boost)', value: computed.hardSkillWithBoost },
  { label: 'Experience Match', value: computed.experienceMatch },
];

const ScoreCard = ({ computed }) => (
  <section className="cv-results-score-card">
    <div className="score-hero-block">
      <div
        className="score-ring"
        style={{
          '--score-color': computed.color,
          '--score-value': `${computed.finalScore}%`,
        }}
      >
        <div className="score-ring-inner">
          <strong style={{ color: computed.color }}>{computed.finalScore}</strong>
          <span>%</span>
        </div>
      </div>

      <div className="score-hero-copy">
        <p className="score-title">Overall Match Score</p>
        <h2 style={{ color: computed.color }}>{computed.grade}</h2>
        <p className="score-message">{computed.gradeMessage}</p>
      </div>
    </div>

    <div className="score-details-block">
      <div className="score-summary-strip">
        <div>
          <span>Candidate</span>
          <strong>{computed.metadata?.candidate_name || 'Unknown'}</strong>
        </div>
        <div>
          <span>Experience</span>
          <strong>{`${computed.cvYears} year(s) CV / ${computed.jdYears} year(s) JD`}</strong>
        </div>
      </div>

      <div className="score-metric-list">
        {scoreMetrics(computed).map((metric) => (
          <div className="score-metric-row" key={metric.label}>
            <div className="score-metric-label">
              <span>{metric.label}</span>
              <strong>{metric.value}%</strong>
            </div>
            <div className="score-track">
              <div
                className="score-fill"
                style={{
                  width: `${metric.value}%`,
                  backgroundColor: computed.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ScoreCard;
