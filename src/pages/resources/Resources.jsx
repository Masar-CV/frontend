import { useResourcesController } from './resources/useResourcesController';
import ResourcesView from './resources/ResourcesView';
import './Resources.css';

const Resources = () => {
  const resourcesController = useResourcesController();

  return (
    <div className="resources-page">
      <ResourcesView {...resourcesController} />
    </div>
  );
};

export default Resources;
