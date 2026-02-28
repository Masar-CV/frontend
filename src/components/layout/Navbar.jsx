import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left: Logo */}
        <div className="navbar-logo">
          <Link to="/">MASAR</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Center: Main navigation */}
        <nav className="navbar-nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <div className="nav-item-with-menu">
            <NavLink to="/dashboard/resources" className="nav-link">
              Resources
            </NavLink>
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </NavLink>
          <NavLink to="/dashboard" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </NavLink>
          <NavLink to="/cv-optimization" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            CV Optimization
          </NavLink>
          <NavLink to="/dashboard/job-tracker" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Job Tracker
          </NavLink>
          <NavLink to="/dashboard/resources" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Resources
          </NavLink>
          <NavLink to="/dashboard/mock-interview" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Mock Interview
          </NavLink>
          <NavLink to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </NavLink>
        </nav>

        <div className="mobile-menu-footer">
          <Link to="/login" className="mobile-login-btn" onClick={closeMobileMenu}>
            Log In
          </Link>
          <Link to="/register" className="mobile-register-btn" onClick={closeMobileMenu}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
