import DownloadActions from './components/DownloadActions';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';

const TemplateEditorView = (props) => (
  <main className="template-editor-main">
    <div className="template-editor-shell">
      <div className="template-editor-layout">
        <EditorPanel {...props} />

        <section className="template-editor-right">
          <h2 className="template-editor-preview-title">Preview</h2>
          <PreviewPanel {...props} />
          <DownloadActions
            onDownloadPdf={props.handleDownloadPdf}
          />
        </section>
      </div>
    </div>
  </main>
);

export default TemplateEditorView;
