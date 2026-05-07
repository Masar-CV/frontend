import { DOWNLOAD_HINTS } from '../templateEditorConfig';

const DownloadActions = ({ isLatexTemplate, onDownloadLatex, onDownloadPdf }) => (
  <>
    <div className="template-editor-download-actions">
      <button type="button" className="template-editor-download-button" onClick={onDownloadLatex}>
        Download LaTeX (.tex)
      </button>
      <button
        type="button"
        className="template-editor-download-button template-editor-download-button--secondary"
        onClick={onDownloadPdf}
      >
        Download PDF
      </button>
    </div>
    <p className="template-editor-download-hint">
      {isLatexTemplate ? DOWNLOAD_HINTS.latex : DOWNLOAD_HINTS.default}
    </p>
  </>
);

export default DownloadActions;
