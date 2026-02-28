import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FeatureCard from '../../components/ui/FeatureCard';
import colImage from '../../assets/images/Col.png';
import vectorLine from '../../assets/images/Vector 14.png';
// Feature Icons
import cvAnalysisIcon from '../../assets/images/cv_analysis.svg';
import skillGapIcon from '../../assets/images/skill_gap.svg';
import aiInterviewIcon from '../../assets/images/ai_interview.svg';
import jobApplicationIcon from '../../assets/images/job_application.svg';
import careerGoalsIcon from '../../assets/images/Career_goals.svg';
import cvTemplatesIcon from '../../assets/images/cv_templates.svg';
import progressTrackingIcon from '../../assets/images/progress_tracking.svg';
import learningIcon from '../../assets/images/learning.svg';
import smartNotificationIcon from '../../assets/images/smart_notification.svg';
// Journey Steps Icons
import uploadCvIcon from '../../assets/images/upload_cv.svg';
import improvePracticeIcon from '../../assets/images/improve_practice.svg';
import applyConfidenceIcon from '../../assets/images/apply_with_confidence.svg';
// CTA Image
import cvSlopingImage from '../../assets/images/cv_sloping.svg';
import './Home.css';

// Journey steps data
const journeySteps = [
  {
    icon: uploadCvIcon,
    title: 'Upload Your CV',
    description: 'Get an instant AI analysis of your CV against any job description to identify skill gaps.'
  },
  {
    icon: improvePracticeIcon,
    title: 'Improve & Practice',
    description: 'Receive personalized learning recommendations and practice with our AI mock interviews.'
  },
  {
    icon: applyConfidenceIcon,
    title: 'Apply with Confidence',
    description: 'Use our CV templates and job tracker to manage your applications and land your dream job.'
  }
];

// Feature cards data
const features = [
  {
    icon: cvAnalysisIcon,
    title: 'CV Analysis',
    subtitle: 'Upload your CV and get instant feedback on how well it matches job descriptions.'
  },
  {
    icon: skillGapIcon,
    title: 'Skill Gap Analysis',
    subtitle: 'Identify missing skills and get personalized learning recommendations.'
  },
  {
    icon: aiInterviewIcon,
    title: 'AI Interview Coach',
    subtitle: 'Practice with AI-powered mock interviews and receive detailed feedback.'
  },
  {
    icon: jobApplicationIcon,
    title: 'Job Application Tracker',
    subtitle: 'Organize and track all your job applications in one place.'
  },
  {
    icon: careerGoalsIcon,
    title: 'Career Goals',
    subtitle: 'Set and track your career development goals with progress analytics.'
  },
  {
    icon: cvTemplatesIcon,
    title: 'CV Templates',
    subtitle: 'Professional, ATS-friendly resume templates optimized for different industries.'
  },
  {
    icon: progressTrackingIcon,
    title: 'Progress Tracking',
    subtitle: 'Visualize your career growth with detailed analytics and milestone achievements.'
  },
  {
    icon: learningIcon,
    title: 'Learning Recommendations',
    subtitle: 'Curated courses, articles, and resources tailored to your career goals and skill level.'
  },
  {
    icon: smartNotificationIcon,
    title: 'Smart Notifications',
    subtitle: 'Stay updated with job opportunities, learning reminders, and career insights.'
  }
];

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
              <Link to="" className="btn-explore">
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

      {/* About MASAR Section */}
      <section className="about-section">
        <div className="about-header">
          <h6 className="about-title">About MASAR</h6>
          <img 
            src={vectorLine} 
            alt="" 
            className="about-underline"
          />
        </div>
        
        <div className="about-content">
          <p className="about-description">
          MASAR is your intelligent career companion, designed to help professionals at every stage of their journey. Our mission is to democratize career development through AI-powered tools that provide personalized guidance, actionable insights, and continuous learning opportunities.
          Whether you're starting out, switching careers, or advancing to leadership, MASAR adapts to your unique goals and helps you navigate the path to success with confidence.
          </p>
          
          {/* Everything You Need Section */}
          <div className="success-header">
            <h2 className="success-title">
              Everything You Need to <span className="success-highlight">Succeed</span>
            </h2>
            <p className="success-subtitle">
              Comprehensive career development tools designed to help you land your dream job.
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                subtitle={feature.subtitle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="journey-header">
          <h2 className="journey-title">
            Your Journey in <span className="journey-highlight">Three</span> Steps
          </h2>
          <p className="journey-subtitle">
            Getting started with MASAR is simple. Our guided process helps you discover and achieve your career potential.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="journey-steps">
          {journeySteps.map((step, index) => (
            <div key={index} className="journey-step">
              <div className="step-icon-wrapper">
                <img src={step.icon} alt={step.title} className="step-icon" />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Career?</h2>
            <p className="cta-description">
              Join MASAR now and unlock AI-powered career development tools that adapt to your unique goals. Your future starts here.
            </p>
            <Link to="/register" className="cta-button">
              Get Started <span className="cta-arrow">→</span>
            </Link>
          </div>
          <div className="cta-image-container">
            <img 
              src={cvSlopingImage} 
              alt="CV Templates" 
              className="cta-image"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

