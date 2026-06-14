import AboutSection from './AboutSection';
import CTASection from './CTASection';
import HeroSection from './HeroSection';
import JourneySection from './JourneySection';

const HomeView = ({ isAuthenticated }) => (
  <div className="home-page">
    <HeroSection isAuthenticated={isAuthenticated} />
    <AboutSection />
    <JourneySection />
    <CTASection isAuthenticated={isAuthenticated} />
  </div>
);

export default HomeView;
