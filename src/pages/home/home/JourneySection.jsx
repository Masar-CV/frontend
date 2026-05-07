import { journeySteps } from './homeData';

const JourneySection = () => (
  <section className="journey-section">
    <div className="journey-header">
      <h2 className="journey-title">
        Your Journey in <span className="journey-highlight">Three</span> Steps
      </h2>
      <p className="journey-subtitle">
        Getting started with MASAR is simple. Our guided process helps you
        discover and achieve your career potential.
      </p>
    </div>

    <div className="journey-steps">
      {journeySteps.map((step) => (
        <div key={step.title} className="journey-step">
          <div className="step-icon-wrapper">
            <img src={step.icon} alt={step.title} className="step-icon" />
          </div>
          <h3 className="step-title">{step.title}</h3>
          <p className="step-description">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default JourneySection;
