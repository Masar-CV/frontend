import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useResourcesController } from './resources/useResourcesController';
import ResourcesView from './resources/ResourcesView';
import './Resources.css';

const Resources = () => {
  const resourcesController = useResourcesController();

  return (
    <div className="resources-page">
      <Navbar />
      <ResourcesView {...resourcesController} />
      <Footer />
    </div>
  );
};

export default Resources;
