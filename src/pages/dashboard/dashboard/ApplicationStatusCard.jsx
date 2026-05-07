const ApplicationStatusCard = () => (
  <section className="dashboard-card dashboard-application-card">
    <h2>Application Status</h2>

    <div className="dashboard-pie-wrap">
      <div
        className="dashboard-pie-chart"
        role="img"
        aria-label="Application status distribution"
      >
        <span className="dashboard-pie-label wishlist">Wishlist 29%</span>
        <span className="dashboard-pie-label applied">Applied 47%</span>
        <span className="dashboard-pie-label interview">Interview 18%</span>
        <span className="dashboard-pie-label offer">Offer 6%</span>
      </div>
    </div>

    <div className="dashboard-legend-grid">
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot wishlist" />
        <span>Wishlist: 1</span>
      </div>
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot applied" />
        <span>Applied: 9</span>
      </div>
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot interview" />
        <span>Interview: 1</span>
      </div>
      <div className="dashboard-legend-item">
        <span className="dashboard-legend-dot offer" />
        <span>Offer: 1</span>
      </div>
    </div>
  </section>
);

export default ApplicationStatusCard;
