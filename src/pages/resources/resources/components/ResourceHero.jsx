import { RESOURCE_COPY } from '../resourcesData';
import ResourceTabs from './ResourceTabs';

const ResourceHero = ({ activeTab, heroImage, onTabChange }) => (
  <section className="resources-hero">
    <div className="resources-hero-content">
      <h1 className="resources-title">{RESOURCE_COPY.title}</h1>
      {RESOURCE_COPY.description.map((line) => (
        <p className="resources-description" key={line}>
          {line}
        </p>
      ))}

      <ResourceTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>

    <div className="resources-hero-image-wrap" aria-hidden="true">
      <img src={heroImage} alt="" className="resources-hero-image" />
    </div>
  </section>
);

export default ResourceHero;
