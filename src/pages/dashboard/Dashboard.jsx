import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome User</h1>
        <p className="dashboard-subtitle">Here's your career development overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3 className="stat-title">Profile Score</h3>
          <p className="stat-value">85%</p>
          <p className="stat-description">Complete your profile to improve</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-title">Job Applications</h3>
          <p className="stat-value">12</p>
          <p className="stat-description">Active applications</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-title">Interviews</h3>
          <p className="stat-value">3</p>
          <p className="stat-description">Upcoming interviews</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-title">Skills Progress</h3>
          <p className="stat-value">68%</p>
          <p className="stat-description">Average skill level</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            <p>No recent activity</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Recommendations</h2>
          <div className="recommendations-list">
            <p>No recommendations available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
