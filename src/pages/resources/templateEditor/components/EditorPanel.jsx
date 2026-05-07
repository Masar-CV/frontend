import { EDITOR_SECTION_TITLES } from '../templateEditorConfig';
import EditorTabs from './EditorTabs';
import FormRenderer from './forms/FormRenderer';

const EditorPanel = (props) => (
  <section className="template-editor-left">
    <h2 className="template-editor-title">Edit Your CV</h2>

    <EditorTabs activeTab={props.activeTab} onTabChange={props.setActiveTab} />

    <div className="template-editor-divider" />

    <h3 className="template-editor-section-title">{EDITOR_SECTION_TITLES[props.activeTab]}</h3>

    <FormRenderer {...props} />
  </section>
);

export default EditorPanel;
