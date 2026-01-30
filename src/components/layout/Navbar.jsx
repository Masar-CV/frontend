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

        {/* Right: Auth actions */}
        <div className="navbar-actions">
          <Link to="/login" className="nav-login-link">
            Log In
          </Link>
          <Link to="/register" className="nav-cta-button">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;