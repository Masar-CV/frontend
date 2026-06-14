import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes/paths';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to={ROUTES.home} className="footer-logo">MASAR</Link>
            <p className="footer-tagline">
              AI-powered career development for ambitious professionals.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                <li><Link to={ROUTES.dashboardCvAnalysis}>CV Analysis</Link></li>
                <li><Link to={ROUTES.dashboardJobTracker}>Job Tracker</Link></li>
                <li><Link to={ROUTES.dashboardMockInterview}>Mock Interview</Link></li>
                <li><Link to={ROUTES.dashboard}>Dashboard</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-list">
                <li><Link to={ROUTES.dashboardResources}>CV Templates</Link></li>
                <li><Link to={ROUTES.dashboardResources}>Cover Letters</Link></li>
                <li><Link to={ROUTES.dashboardResources}>Learning Paths</Link></li>
              </ul>
            </div>

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

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            Copyright {new Date().getFullYear()} MASAR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
