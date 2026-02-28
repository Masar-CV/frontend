import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left: Logo */}
        <div className="navbar-logo">
          <Link to="/">MASAR</Link>
        </div>

        {/* Center: Main navigation */}
        <nav className="navbar-nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <div className="nav-item-with-menu">
          <NavLink to="/dashboard/resources" className="nav-link">
          Resources
          </NavLink>
            {/* Optional dropdown (stub) */}
            {/* <div className="nav-dropdown">
              <Link to="/dashboard/resources" className="nav-dropdown-item">
                Library
              </Link>
            </div> */}
          </div>

          <div className="nav-item-with-menu">
            <button className="nav-link nav-button" type="button">
              Services <span className="nav-caret">▾</span>
            </button>
            <div className="nav-dropdown">
              <Link to="/dashboard/mock-interview" className="nav-dropdown-item">
                Mock Interview
              </Link>
              <Link to="/dashboard/cv-analysis" className="nav-dropdown-item">
                CV Analysis
              </Link>
              <Link to="/dashboard/resources" className="nav-dropdown-item">
                Career Development
              </Link>
            </div>
          </div>

          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/job-tracker" className="nav-link">
            Job Tracker
          </NavLink>
          <NavLink to="/cv-optimization" className="nav-link">
            CV Optimization
          </NavLink>
        </nav>

        {/* Right: Auth actions & Profile */}
        <div className="navbar-actions">
          <Link to="/login" className="nav-login-link">
            Log In
          </Link>
          <Link to="/register" className="nav-cta-button">
            Get Started
          </Link>
          <div className="navbar-user-actions">
            <button className="notification-btn" aria-label="Notifications">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-badge">1</span>
            </button>
            <Link to="/profile" className="profile-avatar-btn" aria-label="Profile">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;