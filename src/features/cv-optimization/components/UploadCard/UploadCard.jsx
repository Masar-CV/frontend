import './UploadCard.css';

const UploadCard = ({ selectedFile, isLoading, progress, statusMessage, onFileSelect, onFileRemove }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragging');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragging');
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-card-header">
        <h2 className="upload-card-title">Upload Your CV</h2>
        <p className="upload-card-description">
          Upload your current CV to receive optimization suggestions
        </p>
      </div>

      <div
        className={`upload-dropzone ${selectedFile ? 'has-file' : ''} ${isLoading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          {isLoading ? (
            <div className="spinner" />
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
        </div>

        {isLoading ? (
          <div className="loading-info">
            <p className="loading-text">{statusMessage}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-text">{progress}%</p>
          </div>
        ) : selectedFile ? (
          <div className="file-info">
            <p className="file-name">{selectedFile.name}</p>
            <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <button className="remove-file-btn" onClick={onFileRemove}>Remove</button>
          </div>
        ) : (
          <>
            <p className="dropzone-text">Drop your CV here</p>
            <p className="dropzone-subtext">or click to browse from your device</p>
          </>
        )}

        {!isLoading && (
          <label className="browse-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Browse Files
            <input type="file" accept=".pdf,.docx,.doc" onChange={handleFileChange} hidden />
          </label>
        )}

        {!isLoading && (
          <div className="supported-formats">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>Supported formats: PDF, DOCX (max 10MB)</span>
          </div>
        )}
      </div>

      <div className="security-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Your data is secure and confidential</span>
      </div>
    </div>
  );
};

export default UploadCard;
