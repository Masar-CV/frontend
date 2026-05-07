import { cvFileLabel } from './cvAnalysisFormatters';

const CVUploadPanel = ({
  fileInputRef,
  selectedFile,
  cvText,
  isDragging,
  setCvText,
  setIsDragging,
  setSelectedFile,
  openFileDialog,
  handleFilePicked,
  handleDrop,
}) => (
  <article className="cv-panel">
    <header className="cv-panel-header">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.5h7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
        <path d="M14 3.5V8h4.5" />
        <path d="M8.5 11h7M8.5 14.5h7M8.5 18h5" />
      </svg>
      <h2>Your CV</h2>
    </header>

    <input
      ref={fileInputRef}
      type="file"
      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      onChange={handleFilePicked}
      hidden
    />

    <div
      className={`cv-upload-box ${isDragging ? 'dragging' : ''} ${selectedFile ? 'filled' : ''}`}
      role="button"
      tabIndex={0}
      onClick={openFileDialog}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') openFileDialog();
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {!selectedFile ? (
        <>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16.5V6.8" />
            <path d="M8.5 10.5 12 7l3.5 3.5" />
            <path d="M5 16.5v2a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-2" />
          </svg>
          <p>Click to upload or drag and drop</p>
          <span>PDF, DOC, or DOCX (Max 5MB)</span>
        </>
      ) : (
        <>
          <p className="selected-file-name">{cvFileLabel(selectedFile)}</p>
          <div className="cv-upload-actions">
            <button type="button" onClick={openFileDialog}>
              Replace
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedFile(null);
              }}
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>

    <div className="cv-divider">
      <span>OR</span>
    </div>

    <label htmlFor="cv-text">Paste CV Text</label>
    <textarea
      id="cv-text"
      placeholder="Paste your CV content here..."
      value={cvText}
      onChange={(event) => setCvText(event.target.value)}
    />
  </article>
);

export default CVUploadPanel;
