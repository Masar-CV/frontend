import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTemplateEditorController } from './templateEditor/useTemplateEditorController';
import TemplateEditorView from './templateEditor/TemplateEditorView';
import './TemplateEditor.css';

const TemplateEditor = () => {
  const editorController = useTemplateEditorController();

  return (
    <div className="template-editor-page">
      <Navbar />
      <TemplateEditorView {...editorController} />
      <Footer />
    </div>
  );
};

export default TemplateEditor;
