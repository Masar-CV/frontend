import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import cvSlopingImage from '../../../assets/images/cv_sloping.svg';

const CTASection = ({ isAuthenticated }) => (
  <section className="cta-section">
    <div className="cta-container">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Transform Your Career?</h2>
        <p className="cta-description">
          Join MASAR now and unlock AI-powered career development tools that
          adapt to your unique goals. Your future starts here.
        </p>
        {!isAuthenticated && (
          <Link to={ROUTES.register} className="cta-button">
            Get Started <span className="cta-arrow">-&gt;</span>
          </Link>
        )}
      </div>
      <div className="cta-image-container">
        <img src={cvSlopingImage} alt="CV Templates" className="cta-image" />
      </div>
    </div>
  </section>
);

export default CTASection;
