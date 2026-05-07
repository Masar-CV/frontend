import CVPreview from './preview/CVPreview';
import LatexPreview from './preview/LatexPreview';

const PreviewPanel = (props) => (
  <div className="template-editor-preview-container">
    {props.isLatexTemplate ? <LatexPreview {...props} /> : <CVPreview {...props} />}
  </div>
);

export default PreviewPanel;
