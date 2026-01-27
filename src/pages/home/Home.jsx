import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import colImage from '../../assets/images/Col.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <main className="home-main">
        <div className="home-container">
          {/* Left: Hero Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              Accelerate<br />
              Your Career<br />
              Journey
            </h1>
            
            {/* Blue curved underline */}
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
              Empower your professional growth with AI-driven CV
              analysis, personalized career insights, and
              comprehensive interview preparation.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn-get-started">
                Get Started <span className="btn-arrow">→</span>
              </Link>
              <Link to="/dashboard" className="btn-explore">
                Explore Features
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hero-image-container">
            <img 
              src={colImage} 
              alt="Career professionals" 
              className="hero-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

