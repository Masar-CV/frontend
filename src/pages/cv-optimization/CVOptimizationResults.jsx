import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import {
  useCVOptimization,
  OverviewCard,
  SummaryContact,
  ExperienceAnalyzer,
  SkillsEducation,
  EvaluationBreakdown
} from '../../features/cv-optimization';
import './CVOptimizationResults.css';

const CVOptimizationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, setResultData, handleDownload } = useCVOptimization();

  useEffect(() => {
    if (location.state?.result) {
      setResultData(location.state.result);
    } else if (!result) {
      navigate('/cv-optimization');
    }
  }, [location.state, result, setResultData, navigate]);

  const data = location.state?.result || result;

  if (!data) {
    return (
      <div className="cv-results-page">
        <Navbar />
        <main className="cv-results-main">
          <div className="cv-results-container">
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading results...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cv-results-page">
      <Navbar />
      
      <main className="cv-results-main">
        <div className="cv-results-container">
          {/* Header */}
          <div className="cv-results-header">
            <div className="header-left">
              <Link to="/cv-optimization" className="back-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Upload
              </Link>
              <h1 className="cv-results-title">CV Analysis Results</h1>
              <p className="cv-results-subtitle">
                Detailed analysis and optimization recommendations for your CV
              </p>
            </div>
          </div>

          {/* Success Banner */}
          <div className="success-banner">
            <div className="success-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="success-text">
              <h3>Analysis Complete!</h3>
              <p>Your CV has been analyzed and optimized successfully</p>
            </div>
          </div>

          {/* Main Results Grid */}
          <div className="results-grid">
            {/* Left Column */}
            <div className="results-left-column">
              {/* Overview Card */}
              <OverviewCard
                qualityScore={data.qualityScore}
                grade={data.grade}
                optimizationId={data.optimizationId}
                fileName={data.fileName}
                onDownload={handleDownload}
              />

              {/* Summary & Contact */}
              <SummaryContact
                metadata={data.metadata}
                contactInfo={data.contactInfo}
                summary={data.summary}
                summaryEvaluation={data.evaluation?.summary}
              />

              {/* Experience Analyzer */}
              <ExperienceAnalyzer
                experienceAnalyzed={data.experienceAnalyzed}
                experienceFixStats={data.experienceFixStats}
              />
            </div>

            {/* Right Column */}
            <div className="results-right-column">
              {/* Evaluation Breakdown */}
              <EvaluationBreakdown
                evaluation={data.evaluation}
                validation={data.validation}
              />

              {/* Skills & Education */}
              <SkillsEducation
                skillsDetected={data.skillsDetected}
                education={data.education}
                projects={data.projects}
                certifications={data.certifications}
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bottom-actions">
            <Link to="/cv-optimization" className="action-btn secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Another CV
            </Link>
            <button className="action-btn primary" onClick={handleDownload}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Optimized CV
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVOptimizationResults;
