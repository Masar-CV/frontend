const JobTrackerHero = () => (
  <section className="job-tracker-hero">
    <div>
      <h1>Job Application Tracker</h1>
      <p>Manage all your job applications in one place</p>
    </div>

    <button type="button" className="job-tracker-add-btn">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 4.2v11.6M4.2 10h11.6" />
      </svg>
      <span>Add Job</span>
    </button>
  </section>
);

export default JobTrackerHero;
