import './JobTracker.css';

const JobTracker = () => {
  return (
    <div className="job-tracker">
      <div className="job-tracker-header">
        <h1 className="page-title">Job Tracker</h1>
        <p className="page-subtitle">Track your job applications and interviews</p>
      </div>

      <div className="job-tracker-content">
        <div className="filter-section">
          <button type="button" className="filter-btn active">All</button>
          <button type="button" className="filter-btn">Applied</button>
          <button type="button" className="filter-btn">Interviewing</button>
          <button type="button" className="filter-btn">Offers</button>
        </div>

        <div className="jobs-table">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="empty-state">
                  No jobs tracked yet. Start applying to see them here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobTracker;

