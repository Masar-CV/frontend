const ApplicationsTable = ({ applications }) => (
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
            <tr key={`table-${app.company}`}>
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
                <button type="button" aria-label={`More options for ${app.company}`}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <circle cx="10" cy="10" r="1.4" />
                    <circle cx="5" cy="10" r="1.4" />
                    <circle cx="15" cy="10" r="1.4" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="job-tracker-mobile-list">
      {applications.map((app) => (
        <article
          key={`mobile-${app.company}`}
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
        </article>
      ))}
    </div>
  </section>
);

export default ApplicationsTable;
