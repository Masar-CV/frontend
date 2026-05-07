const SummaryStats = ({ stats }) => (
  <section className="job-tracker-stats">
    {stats.map((stat) => (
      <article key={stat.label} className="job-tracker-stat-card">
        <p className={`job-tracker-stat-value ${stat.tone}`}>{stat.value}</p>
        <p className="job-tracker-stat-label">{stat.label}</p>
      </article>
    ))}
  </section>
);

export default SummaryStats;
