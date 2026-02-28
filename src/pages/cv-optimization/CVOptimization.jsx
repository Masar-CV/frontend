import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useCVOptimization, OPTIMIZATION_STATUS } from '../../features/cv-optimization';
import tokenManager from '../../utils/tokenManager';
import './CVOptimization.css';

const CVOptimization = () => {
  const navigate = useNavigate();
  const isAuthenticated = tokenManager.isAuthenticated();
  const user = tokenManager.getUser();
  
  const {
    selectedFile,
    status,
    progress,
    error,
    isLoading,
    handleFileSelect,
    handleFileRemove,
    handleOptimize
  } = useCVOptimization();

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
      handleFileSelect(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    const result = await handleOptimize();
    if (result) {
      navigate('/cv-optimization/results', { state: { result } });
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case OPTIMIZATION_STATUS.UPLOADING:
        return 'Uploading your CV...';
      case OPTIMIZATION_STATUS.PROCESSING:
        return 'Analyzing and optimizing your CV...';
      default:
        return null;
    }
  };

  return (
    <div className="cv-optimization-page">
      <Navbar />
      
      <main className="cv-optimization-main">
        <div className="cv-optimization-container">
          {/* Header */}
          <div className="cv-optimization-header">
            <h1 className="cv-optimization-title">CV Optimization</h1>
            <p className="cv-optimization-subtitle">
              Improve your CV with AI-powered insights
            </p>
          </div>

          {/* Authentication Banner */}
          {!isAuthenticated && (
            <div className="auth-banner">
              <div className="auth-banner-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="auth-banner-content">
                <h3>Login Required</h3>
                <p>Please login to use the CV optimization feature.</p>
              </div>
              <Link to="/login" className="auth-banner-btn">
                Login Now
              </Link>
            </div>
          )}

          {/* Welcome Banner for logged in users */}
          {isAuthenticated && user && (
            <div className="welcome-banner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Welcome, <strong>{user.fullName}</strong>! Upload your CV to get started.</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <div className="error-content">
                <span>{error}</span>
                {error.includes('login') && (
                  <Link to="/login" className="error-login-link">Go to Login</Link>
                )}
              </div>
            </div>
          )}

          {/* Upload Card */}
          <div className="upload-card">
            <div className="upload-card-header">
              <h2 className="upload-card-title">Upload Your CV</h2>
              <p className="upload-card-description">
                Upload your current CV to receive optimization suggestions
              </p>
            </div>

            {/* Dropzone */}
            <div
              className={`upload-dropzone ${selectedFile ? 'has-file' : ''} ${isLoading ? 'loading' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Upload Icon */}
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
                  <p className="loading-text">{getStatusMessage()}</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="progress-text">{progress}%</p>
                </div>
              ) : selectedFile ? (
                <div className="file-info">
                  <p className="file-name">{selectedFile.name}</p>
                  <p className="file-size">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button 
                    className="remove-file-btn"
                    onClick={handleFileRemove}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p className="dropzone-text">Drop your CV here</p>
                  <p className="dropzone-subtext">or click to browse from your device</p>
                </>
              )}

              {/* Browse Button - hide when loading */}
              {!isLoading && (
                <label className="browse-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              )}

              {/* Supported Formats */}
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

            {/* Security Note */}
            <div className="security-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Your data is secure and confidential</span>
            </div>
          </div>

          {/* Analyze Button */}
          <button 
            className={`analyze-btn ${selectedFile && !isLoading ? 'active' : ''}`}
            onClick={handleAnalyze}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <>
                <div className="btn-spinner" />
                Processing...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Analyze CV
              </>
            )}
          </button>

          {/* Security Note Below Button */}
          <div className="security-note-bottom">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Your data is secure and confidential</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVOptimization;
