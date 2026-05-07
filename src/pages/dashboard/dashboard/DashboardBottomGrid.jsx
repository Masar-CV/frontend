const DashboardBottomGrid = ({ recommendations }) => (
  <section className="dashboard-bottom-grid">
    <article className="dashboard-card dashboard-recommendations">
      <h2>AI Recommendations</h2>
      <ul>
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>

    <article className="dashboard-card dashboard-success">
      <h2>Success Prediction</h2>
      <div className="dashboard-success-header">
        <span>Estimated Success Rate</span>
        <strong>78%</strong>
      </div>
      <div className="dashboard-success-track">
        <div className="dashboard-success-fill" />
      </div>
      <p>
        Based on your current skillset, application rate, and interview
        performance, you have a high probability of receiving an offer within the
        next 4-6 weeks.
      </p>
    </article>
  </section>
);

export default DashboardBottomGrid;
