import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './CVOptimization.css';

const CVOptimization = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = () => {
    if (file) {
      console.log('Analyzing:', file.name);
      // Navigate to results page
      navigate('/cv-optimization/results');
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
              className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Upload Icon */}
              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              {file ? (
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <button 
                    className="remove-file-btn"
                    onClick={() => setFile(null)}
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

              {/* Browse Button */}
              <label className="browse-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Browse Files
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileSelect}
                  hidden
                />
              </label>

              {/* Supported Formats */}
              <div className="supported-formats">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>Supported formats: PDF, DOCX (max 10MB)</span>
              </div>
            </div>

            {/* Security Note */}
            <div className="security-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>Your data is secure and confidential</span>
            </div>
          </div>

          {/* Analyze Button */}
          <button 
            className={`analyze-btn ${file ? 'active' : ''}`}
            onClick={handleAnalyze}
            disabled={!file}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            Analyze CV
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

