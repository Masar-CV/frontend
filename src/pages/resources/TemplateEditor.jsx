import { useTemplateEditorController } from './templateEditor/useTemplateEditorController';
import TemplateEditorView from './templateEditor/TemplateEditorView';
import './TemplateEditor.css';

const TemplateEditor = () => {
  const editorController = useTemplateEditorController();

  return (
    <div className="template-editor-page">
      <TemplateEditorView {...editorController} />
    </div>
  );
};

export default TemplateEditor;
