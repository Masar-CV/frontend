import './StatisticsCard.css';

const clampProgress = (value) => Math.max(0, Math.min(100, Number(value) || 0));

const StatisticsCard = ({ statistics }) => (
  <div className="profile-card">
    <h2 className="card-title">Profile Statistics</h2>
    {statistics ? (
      <div className="stats-section">
        {statistics.profileCompletionPercentage !== undefined && (
          <div className="stat-item completion">
            <div className="stat-header">
              <span className="stat-label">Profile Completion</span>
              <span className="stat-value completion-value">{clampProgress(statistics.profileCompletionPercentage)}%</span>
            </div>
            <div className="completion-bar">
              <div className="completion-progress" style={{ width: `${clampProgress(statistics.profileCompletionPercentage)}%` }} />
            </div>
          </div>
        )}
        {statistics.applicationsCount !== undefined && (
          <div className="stat-item">
            <span className="stat-label">Applications</span>
            <span className="stat-value">{statistics.applicationsCount}</span>
          </div>
        )}
        {statistics.interviewsCount !== undefined && (
          <div className="stat-item">
            <span className="stat-label">Interviews</span>
            <span className="stat-value">{statistics.interviewsCount}</span>
          </div>
        )}
        {statistics.cvDownloadsCount !== undefined && (
          <div className="stat-item">
            <span className="stat-label">CV Downloads</span>
            <span className="stat-value">{statistics.cvDownloadsCount}</span>
          </div>
        )}
      </div>
    ) : (
      <p className="stats-loading">Loading statistics...</p>
    )}
  </div>
);

export default StatisticsCard;
