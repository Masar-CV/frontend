import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-logo">Masar</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
          <Link to="/dashboard/cv-analysis" className="sidebar-link">
            CV Analysis
          </Link>
          <Link to="/dashboard/mock-interview" className="sidebar-link">
            Mock Interview
          </Link>
          <Link to="/dashboard/job-tracker" className="sidebar-link">
            Job Tracker
          </Link>
          <Link to="/dashboard/resources" className="sidebar-link">
            Resources
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

