import ApplicationMeta from './ApplicationMeta';

const RecentApplications = ({ applications }) => (
  <section className="job-tracker-recent">
    <h2>Recent Applications</h2>

    <div className="job-tracker-recent-grid">
      {applications.map((app) => (
        <article key={app.company} className="job-tracker-recent-card">
          <h3>{app.company}</h3>
          <p className="job-tracker-position">{app.position}</p>

          <p className={`job-status-badge ${app.statusTone}`}>{app.status}</p>

          <ApplicationMeta app={app} />

          <p className="job-tracker-notes">{app.notes}</p>
        </article>
      ))}
    </div>
  </section>
);

export default RecentApplications;
