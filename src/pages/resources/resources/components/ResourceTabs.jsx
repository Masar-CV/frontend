import { RESOURCE_TABS } from '../resourcesData';

const ResourceTabs = ({ activeTab, onTabChange }) => (
  <div className="resources-switch" role="tablist" aria-label="Resource type">
    {RESOURCE_TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={activeTab === tab.id}
        className={`resources-switch-option ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default ResourceTabs;
