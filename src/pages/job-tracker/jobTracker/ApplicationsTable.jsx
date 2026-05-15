const ApplicationsTable = ({
  applications,
  deletingApplicationId,
  onDeleteApplication,
  onEditApplication,
}) => (
  <section className="job-tracker-table-wrap">
    <h2>All Applications</h2>
    <p className="job-tracker-table-hint">
      Swipe horizontally to view the full table on smaller screens.
    </p>

    <div className="job-tracker-table-shell">
      <table className="job-tracker-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Date Applied</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Notes</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={`table-${app.id || app.company}`}>
              <td>{app.company}</td>
              <td>{app.position}</td>
              <td>
                <span className={`job-status-badge ${app.statusTone}`}>
                  {app.status}
                </span>
              </td>
              <td>{app.dateApplied}</td>
              <td className="salary">{app.salary}</td>
              <td>{app.location}</td>
              <td>{app.contact}</td>
              <td className="notes">{app.notes}</td>
              <td className="actions">
                <div className="job-tracker-actions">
                  <button
                    type="button"
                    aria-label={`Edit ${app.company}`}
                    title="Edit"
                    onClick={() => onEditApplication(app)}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 14.2V16h1.8l8.9-8.9-1.8-1.8L4 14.2Z" />
                      <path d="M12 4.4l1.8-1.8 1.8 1.8-1.8 1.8L12 4.4Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="danger"
                    aria-label={`Delete ${app.company}`}
                    title="Delete"
                    disabled={deletingApplicationId === app.id}
                    onClick={() => onDeleteApplication(app)}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.5 7h9M8 7V5.2h4V7M7 7.8l.5 7h5l.5-7" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="job-tracker-mobile-list">
      {applications.map((app) => (
        <article
          key={`mobile-${app.id || app.company}`}
          className="job-tracker-mobile-card"
        >
          <div className="job-tracker-mobile-head">
            <div>
              <h3>{app.company}</h3>
              <p>{app.position}</p>
            </div>
            <span className={`job-status-badge ${app.statusTone}`}>
              {app.status}
            </span>
          </div>

          <div className="job-tracker-mobile-grid">
            <div>
              <span>Date Applied</span>
              <strong>{app.dateApplied}</strong>
            </div>
            <div>
              <span>Salary</span>
              <strong className="salary">{app.salary}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{app.location}</strong>
            </div>
            <div>
              <span>Contact</span>
              <strong>{app.contact}</strong>
            </div>
          </div>

          <p className="job-tracker-mobile-notes">{app.notes}</p>

          <div className="job-tracker-mobile-actions">
            <button
              type="button"
              className="job-tracker-mobile-edit"
              onClick={() => onEditApplication(app)}
            >
              Edit
            </button>
            <button
              type="button"
              className="job-tracker-mobile-delete"
              disabled={deletingApplicationId === app.id}
              onClick={() => onDeleteApplication(app)}
            >
              {deletingApplicationId === app.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ApplicationsTable;
