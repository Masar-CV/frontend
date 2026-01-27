import './FeatureCard.css';

const FeatureCard = ({ icon, title, subtitle }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">
        <img src={icon} alt={title} />
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-subtitle">{subtitle}</p>
    </div>
  );
};

export default FeatureCard;

