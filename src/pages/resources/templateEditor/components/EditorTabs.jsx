import { EDITOR_TABS } from '../templateEditorConfig';

const EditorTabs = ({ activeTab, onTabChange }) => (
  <div className="template-editor-tabs" role="tablist" aria-label="Editor tabs">
    {EDITOR_TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={activeTab === tab.id}
        className={`template-editor-tab ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default EditorTabs;
