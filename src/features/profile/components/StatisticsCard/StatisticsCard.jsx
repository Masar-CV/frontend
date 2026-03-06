import './StatisticsCard.css';

const StatisticsCard = ({ statistics }) => (
  <div className="profile-card">
    <h2 className="card-title">Profile Statistics</h2>
    {statistics ? (
      <div className="stats-section">
        {statistics.profileCompletion !== undefined && (
          <div className="stat-item completion">
            <div className="stat-header">
              <span className="stat-label">Profile Completion</span>
              <span className="stat-value completion-value">{statistics.profileCompletion}%</span>
            </div>
            <div className="completion-bar">
              <div className="completion-progress" style={{ width: `${statistics.profileCompletion}%` }} />
            </div>
          </div>
        )}
        {statistics.applications !== undefined && (
          <div className="stat-item">
            <span className="stat-label">Applications</span>
            <span className="stat-value">{statistics.applications}</span>
          </div>
        )}
        {statistics.interviews !== undefined && (
          <div className="stat-item">
            <span className="stat-label">Interviews</span>
            <span className="stat-value">{statistics.interviews}</span>
          </div>
        )}
        {statistics.cvDownloads !== undefined && (
          <div className="stat-item">
            <span className="stat-label">CV Downloads</span>
            <span className="stat-value">{statistics.cvDownloads}</span>
          </div>
        )}
      </div>
    ) : (
      <p className="stats-loading">Loading statistics...</p>
    )}
  </div>
);

export default StatisticsCard;
