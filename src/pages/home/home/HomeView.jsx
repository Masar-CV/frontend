import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';
import AboutSection from './AboutSection';
import CTASection from './CTASection';
import HeroSection from './HeroSection';
import JourneySection from './JourneySection';

const HomeView = ({ isAuthenticated }) => (
  <div className="home-page">
    <Navbar />
    <HeroSection isAuthenticated={isAuthenticated} />
    <AboutSection />
    <JourneySection />
    <CTASection isAuthenticated={isAuthenticated} />
    <Footer />
  </div>
);

export default HomeView;
