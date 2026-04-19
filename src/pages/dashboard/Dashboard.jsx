import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import './Dashboard.css';

const kpiCards = [
  {
    title: 'Success Rate',
    value: '65%',
    delta: '+12%',
    deltaTone: 'positive',
    iconClass: 'trend'
  },
  {
    title: 'Skills Progress',
    value: '88%',
    delta: '+8%',
    deltaTone: 'info',
    iconClass: 'target'
  },
  {
    title: 'Courses Completed',
    value: '12',
    delta: '+3 this month',
    deltaTone: 'accent',
    iconClass: 'badge'
  },
  {
    title: 'Learning Hours',
    value: '156h',
    delta: '-23 this week',
    deltaTone: 'warning',
    iconClass: 'calendar'
  }
];

const skillRows = [
  { name: 'React', current: 85, target: 90 },
  { name: 'TypeScript', current: 70, target: 80 },
  { name: 'Node.js', current: 76, target: 84 },
  { name: 'Python', current: 63, target: 80 },
  { name: 'AWS', current: 50, target: 75 }
];

const recommendations = [
  'Focus on AWS certification to increase job match rate by 15%.',
  'Complete 2 more TypeScript projects to reach your target skill level.',
  'Your interview success rate is high, apply to 5 more positions this week.'
];

const monthlySeries = {
  applications: '10,122 144,118 278,112 411,104 544,96 678,88',
  interviews: '10,170 144,168 278,164 411,160 544,160 678,164',
  skillLevel: '10,156 144,152 278,148 411,144 544,136 678,130'
};

const monthlyLabels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

const Dashboard = () => {
  return (
    <div className="dashboard-screen">
      <Navbar />

      <main className="dashboard-main">
        <section className="dashboard-header">
          <h1>Progress Dashboard</h1>
          <p>Track your career development journey with detailed analytics</p>
        </section>

        <section className="dashboard-kpi-grid">
          {kpiCards.map((card) => (
            <article key={card.title} className="dashboard-kpi-card">
              <div className="dashboard-kpi-top">
                <span className={`dashboard-kpi-icon ${card.iconClass}`} aria-hidden="true">
                  {card.iconClass === 'trend' && (
                    <svg viewBox="0 0 20 20">
                      <path d="M4 13.5l4-4 2.5 2.5L16 6.5" />
                      <path d="M12 6.5h4v4" />
                    </svg>
                  )}
                  {card.iconClass === 'target' && (
                    <svg viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="6" />
                      <circle cx="10" cy="10" r="3.5" />
                    </svg>
                  )}
                  {card.iconClass === 'badge' && (
                    <svg viewBox="0 0 20 20">
                      <circle cx="10" cy="7.5" r="3.5" />
                      <path d="M7.5 11.5v5L10 15l2.5 1.5v-5" />
                    </svg>
                  )}
                  {card.iconClass === 'calendar' && (
                    <svg viewBox="0 0 20 20">
                      <rect x="3.5" y="4.5" width="13" height="12" rx="2" />
                      <path d="M6.5 3.5v3M13.5 3.5v3M3.5 8.5h13" />
                    </svg>
                  )}
                </span>
                <span className={`dashboard-kpi-delta ${card.deltaTone}`}>{card.delta}</span>
              </div>
              <p className="dashboard-kpi-value">{card.value}</p>
              <p className="dashboard-kpi-title">{card.title}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-card dashboard-skill-card">
          <h2>Skill Progress</h2>
          <div className="dashboard-skills-list">
            {skillRows.map((skill) => (
              <div key={skill.name} className="dashboard-skill-row">
                <div className="dashboard-skill-meta">
                  <span>{skill.name}</span>
                  <span>{`${skill.current} / 100`}</span>
                </div>
                <div className="dashboard-progress-track" role="presentation">
                  <div className="dashboard-progress-fill" style={{ width: `${skill.current}%` }} />
                </div>
                <p className="dashboard-skill-target">{`Target: ${skill.target}`}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-card dashboard-application-card">
          <h2>Application Status</h2>

          <div className="dashboard-pie-wrap">
            <div className="dashboard-pie-chart" role="img" aria-label="Application status distribution">
              <span className="dashboard-pie-label wishlist">Wishlist 29%</span>
              <span className="dashboard-pie-label applied">Applied 47%</span>
              <span className="dashboard-pie-label interview">Interview 18%</span>
              <span className="dashboard-pie-label offer">Offer 6%</span>
            </div>
          </div>

          <div className="dashboard-legend-grid">
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot wishlist" />
              <span>Wishlist: 1</span>
            </div>
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot applied" />
              <span>Applied: 9</span>
            </div>
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot interview" />
              <span>Interview: 1</span>
            </div>
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot offer" />
              <span>Offer: 1</span>
            </div>
          </div>
        </section>

        <section className="dashboard-card dashboard-trends-card">
          <h2>Monthly Progress Trends</h2>

          <div className="dashboard-trends-plot">
            <svg viewBox="0 0 700 220" preserveAspectRatio="none" aria-hidden="true">
              <line x1="10" y1="190" x2="690" y2="190" />
              <line x1="10" y1="150" x2="690" y2="150" />
              <line x1="10" y1="110" x2="690" y2="110" />
              <line x1="10" y1="70" x2="690" y2="70" />
              <line x1="10" y1="30" x2="690" y2="30" />
              <polyline className="applications-line" points={monthlySeries.applications} />
              <polyline className="interviews-line" points={monthlySeries.interviews} />
              <polyline className="skills-line" points={monthlySeries.skillLevel} />
            </svg>
          </div>

          <div className="dashboard-trends-months">
            {monthlyLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="dashboard-trends-legend">
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot applied" />
              <span>Applications</span>
            </div>
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot interview" />
              <span>Interviews</span>
            </div>
            <div className="dashboard-legend-item">
              <span className="dashboard-legend-dot offer" />
              <span>Skill Level %</span>
            </div>
          </div>
        </section>

        <section className="dashboard-bottom-grid">
          <article className="dashboard-card dashboard-recommendations">
            <h2>AI Recommendations</h2>
            <ul>
              {recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="dashboard-card dashboard-success">
            <h2>Success Prediction</h2>
            <div className="dashboard-success-header">
              <span>Estimated Success Rate</span>
              <strong>78%</strong>
            </div>
            <div className="dashboard-success-track">
              <div className="dashboard-success-fill" />
            </div>
            <p>
              Based on your current skillset, application rate, and interview performance, you have a high
              probability of receiving an offer within the next 4-6 weeks.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

