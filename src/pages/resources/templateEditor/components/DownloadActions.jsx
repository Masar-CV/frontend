import { DOWNLOAD_HINTS } from '../templateEditorConfig';

const DownloadActions = ({ onDownloadPdf }) => (
  <>
    <div className="template-editor-download-actions">
      <button
        type="button"
        className="template-editor-download-button"
        onClick={onDownloadPdf}
      >
        Download PDF
      </button>
    </div>
    <p className="template-editor-download-hint">{DOWNLOAD_HINTS.default}</p>
  </>
);

export default DownloadActions;
