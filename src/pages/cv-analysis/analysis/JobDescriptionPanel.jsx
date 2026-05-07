const JobDescriptionPanel = ({ jobDescription, setJobDescription }) => (
  <article className="cv-panel">
    <header className="cv-panel-header">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 8h15v11.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 19.5V8Z" />
        <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8" />
        <path d="M4.5 11.5h15" />
      </svg>
      <h2>Job Description</h2>
    </header>

    <label htmlFor="job-desc">Target Job Description</label>
    <textarea
      id="job-desc"
      className="job-description-area"
      placeholder="Paste the job description you're applying for..."
      value={jobDescription}
      onChange={(event) => setJobDescription(event.target.value)}
    />
  </article>
);

export default JobDescriptionPanel;
