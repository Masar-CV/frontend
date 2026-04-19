import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import './JobTracker.css';

const summaryStats = [
  { label: 'Wishlist', value: 1, tone: 'wishlist' },
  { label: 'Applied', value: 2, tone: 'applied' },
  { label: 'Interview', value: 2, tone: 'interview' },
  { label: 'Offer', value: 1, tone: 'offer' }
];

const applications = [
  {
    company: 'TechCorp',
    position: 'Senior Frontend Developer',
    status: 'Interview',
    statusTone: 'interview',
    dateApplied: '1/15/2025',
    salary: '$120,000',
    location: 'San Francisco, CA',
    contact: 'Sarah Johnson',
    notes: 'Second round interview scheduled'
  },
  {
    company: 'StartupXYZ',
    position: 'Full Stack Engineer',
    status: 'Applied',
    statusTone: 'applied',
    dateApplied: '1/20/2025',
    salary: '$100,000',
    location: 'Remote',
    contact: 'Mike Chen',
    notes: 'Applied through LinkedIn'
  },
  {
    company: 'BigTech Inc',
    position: 'React Developer',
    status: 'Offer',
    statusTone: 'offer',
    dateApplied: '1/10/2025',
    salary: '$140,000',
    location: 'Seattle, WA',
    contact: 'Alex Rodriguez',
    notes: 'Offer pending review'
  },
  {
    company: 'LocalFirm',
    position: 'JavaScript Developer',
    status: 'Rejected',
    statusTone: 'rejected',
    dateApplied: '1/5/2025',
    salary: '$80,000',
    location: 'Austin, TX',
    contact: 'Emma Wilson',
    notes: 'Not a good culture fit'
  }
];

const JobTracker = () => {
  return (
    <div className="job-tracker-screen">
      <Navbar />

      <main className="job-tracker-main">
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

        <section className="job-tracker-stats">
          {summaryStats.map((stat) => (
            <article key={stat.label} className="job-tracker-stat-card">
              <p className={`job-tracker-stat-value ${stat.tone}`}>{stat.value}</p>
              <p className="job-tracker-stat-label">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="job-tracker-recent">
          <h2>Recent Applications</h2>

          <div className="job-tracker-recent-grid">
            {applications.map((app) => (
              <article key={app.company} className="job-tracker-recent-card">
                <h3>{app.company}</h3>
                <p className="job-tracker-position">{app.position}</p>

                <p className={`job-status-badge ${app.statusTone}`}>{app.status}</p>

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

                <p className="job-tracker-notes">{app.notes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="job-tracker-table-wrap">
          <h2>All Applications</h2>
          <p className="job-tracker-table-hint">Swipe horizontally to view the full table on smaller screens.</p>

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
                      <span className={`job-status-badge ${app.statusTone}`}>{app.status}</span>
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
              <article key={`mobile-${app.company}`} className="job-tracker-mobile-card">
                <div className="job-tracker-mobile-head">
                  <div>
                    <h3>{app.company}</h3>
                    <p>{app.position}</p>
                  </div>
                  <span className={`job-status-badge ${app.statusTone}`}>{app.status}</span>
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
      </main>

      <Footer />
    </div>
  );
};

export default JobTracker;

