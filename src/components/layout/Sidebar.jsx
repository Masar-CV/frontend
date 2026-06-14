import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes/paths';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-logo">Masar</h2>
        <nav className="sidebar-nav">
          <Link to={ROUTES.dashboard} className="sidebar-link">
            Dashboard
          </Link>
          <Link to={ROUTES.dashboardCvAnalysis} className="sidebar-link">
            CV Analysis
          </Link>
          <Link to={ROUTES.dashboardMockInterview} className="sidebar-link">
            Mock Interview
          </Link>
          <Link to={ROUTES.dashboardJobTracker} className="sidebar-link">
            Job Tracker
          </Link>
          <Link to={ROUTES.dashboardResources} className="sidebar-link">
            Resources
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

