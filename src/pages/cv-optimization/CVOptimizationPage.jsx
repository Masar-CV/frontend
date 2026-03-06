import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useCVOptimization, OPTIMIZATION_STATUS, UploadCard } from '../../features/cv-optimization';
import tokenManager from '../../utils/tokenManager';
import './CVOptimizationPage.css';

const CVOptimizationPage = () => {
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

  const handleAnalyze = async () => {
    const result = await handleOptimize();
    if (result) {
      navigate('/cv-optimization/results', { state: { result } });
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case OPTIMIZATION_STATUS.UPLOADING: return 'Uploading your CV...';
      case OPTIMIZATION_STATUS.PROCESSING: return 'Analyzing and optimizing your CV...';
      default: return null;
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
              <Link to="/login" className="auth-banner-btn">Login Now</Link>
            </div>
          )}

          {/* Welcome Banner */}
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
          <UploadCard
            selectedFile={selectedFile}
            isLoading={isLoading}
            progress={progress}
            statusMessage={getStatusMessage()}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
          />

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

          {/* Security Note */}
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

export default CVOptimizationPage;
