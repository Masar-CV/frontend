const ApplicationMeta = ({ app }) => (
  <div className="job-tracker-meta">
    <p>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <rect x="4.5" y="5.3" width="11" height="10.2" rx="2" />
        <path d="M6.8 4.2v2.2M13.2 4.2v2.2M4.5 8.6h11" />
      </svg>
      {app.dateApplied}
    </p>
    <p>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 16.3s-4.8-4-4.8-7.3a4.8 4.8 0 1 1 9.6 0c0 3.3-4.8 7.3-4.8 7.3Z" />
        <circle cx="10" cy="9" r="1.6" />
      </svg>
      {app.location}
    </p>
    <p className="job-tracker-salary">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 2.8v14.4M13.3 6.1c0-1.3-1.5-2.3-3.3-2.3S6.7 4.8 6.7 6.1c0 3.3 6.6 1.5 6.6 4.9 0 1.3-1.5 2.3-3.3 2.3S6.7 12.3 6.7 11" />
      </svg>
      {app.salary}
    </p>
  </div>
);

export default ApplicationMeta;
