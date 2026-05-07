import FeatureCard from '../../../components/ui/FeatureCard';
import vectorLine from '../../../assets/images/Vector 14.png';
import { features } from './homeData';

const AboutSection = () => (
  <section className="about-section">
    <div className="about-header">
      <h6 className="about-title">About MASAR</h6>
      <img src={vectorLine} alt="" className="about-underline" />
    </div>

    <div className="about-content">
      <p className="about-description">
        MASAR is your intelligent career companion, designed to help
        professionals at every stage of their journey. Our mission is to
        democratize career development through AI-powered tools that provide
        personalized guidance, actionable insights, and continuous learning
        opportunities. Whether you're starting out, switching careers, or
        advancing to leadership, MASAR adapts to your unique goals and helps you
        navigate the path to success with confidence.
      </p>

      <div className="success-header">
        <h2 className="success-title">
          Everything You Need to <span className="success-highlight">Succeed</span>
        </h2>
        <p className="success-subtitle">
          Comprehensive career development tools designed to help you land your
          dream job.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            subtitle={feature.subtitle}
          />
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
