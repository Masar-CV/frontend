const MonthlyTrendsCard = ({ monthlySeries, monthlyLabels }) => (
  <section className="dashboard-card dashboard-trends-card">
    <h2>Monthly Progress Trends</h2>

    <div className="dashboard-trends-plot">
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" aria-hidden="true">
        <line x1="10" y1="190" x2="690" y2="190" />
        <line x1="10" y1="150" x2="690" y2="150" />
        <line x1="10" y1="110" x2="690" y2="110" />
        <line x1="10" y1="70" x2="690" y2="70" />
        <line x1="10" y1="30" x2="690" y2="30" />
        <polyline
          className="applications-line"
          points={monthlySeries.applications}
        />
        <polyline className="interviews-line" points={monthlySeries.interviews} />
        <polyline className="skills-line" points={monthlySeries.skillLevel} />
      </svg>
    </div>

    <div className="dashboard-trends-months">
      {monthlyLabels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>

    <div className="dashboard-trends-legend">
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot applied" />
        <span>Applications</span>
      </div>
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot interview" />
        <span>Interviews</span>
      </div>
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot offer" />
        <span>Skill Level %</span>
      </div>
    </div>
  </section>
);

export default MonthlyTrendsCard;
