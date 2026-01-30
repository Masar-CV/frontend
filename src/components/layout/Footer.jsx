import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">MASAR</Link>
            <p className="footer-tagline">
              AI-powered career development for ambitious professionals.
            </p>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            {/* Product */}
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                <li><Link to="/dashboard/cv-analysis">CV Analysis</Link></li>
                <li><Link to="/dashboard/job-tracker">Job Tracker</Link></li>
                <li><Link to="/dashboard/mock-interview">Mock Interview</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-column">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-list">
                <li><Link to="/dashboard/resources">CV Templates</Link></li>
                <li><Link to="/dashboard/resources">Cover Letters</Link></li>
                <li><Link to="/dashboard/resources">Learning Paths</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} MASAR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

