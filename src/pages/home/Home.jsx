import HomeView from './home/HomeView';
import useHomeController from './home/useHomeController';
import './Home.css';

const Home = () => {
  const controller = useHomeController();
  return <HomeView {...controller} />;
};

export default Home;
