import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import colImage from '../../../assets/images/Col.png';

const HeroSection = ({ isAuthenticated }) => (
  <main className="home-main">
    <div className="home-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Accelerate
          <br />
          Your Career
          <br />
          Journey
        </h1>

        <svg className="hero-curve" viewBox="0 0 300 30" preserveAspectRatio="none">
          <path
            d="M0 25 Q150 0 300 25"
            stroke="#2563eb"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <p className="hero-description">
          Empower your professional growth with AI-driven CV analysis,
          personalized career insights, and comprehensive interview preparation.
        </p>

        <div className="hero-buttons">
          {!isAuthenticated && (
            <Link to={ROUTES.register} className="btn-get-started">
              Get Started <span className="btn-arrow">-&gt;</span>
            </Link>
          )}
          <Link to={ROUTES.dashboardResources} className="btn-explore">
            Explore Features
          </Link>
        </div>
      </div>

      <div className="hero-image-container">
        <img src={colImage} alt="Career professionals" className="hero-image" />
      </div>
    </div>
  </main>
);

export default HeroSection;
