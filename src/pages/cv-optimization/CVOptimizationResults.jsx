import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './CVOptimizationResults.css';

const CVOptimizationResults = () => {
  // Sample data - in real app, this would come from API/state
  const results = {
    wordCount: { before: 49, after: 22, change: '55% reduction' },
    readabilityScore: { before: 13.13, after: 55.18, change: '320% improvement' },
    overallScore: '+42.04',
    rating: 'Excellent',
    insights: [
      'Reduced unnecessary wording by 55% for clearer communication',
      'Improved sentence clarity and structure for better readability',
      'Optimized for ATS (Applicant Tracking Systems) compatibility',
      'Enhanced keyword density for target job roles',
      'Strengthened action verbs and impact statements',
      'Removed redundant phrases and filler words'
    ]
  };

  const handleDownload = () => {
    console.log('Downloading optimized CV...');
    // Add download logic here
  };

  return (
    <div className="cv-results-page">
      <Navbar />
      
      <main className="cv-results-main">
        <div className="cv-results-container">
          {/* Header */}
          <div className="cv-results-header">
            <h1 className="cv-results-title">CV Optimization</h1>
            <p className="cv-results-subtitle">
              Improve your CV with AI-powered insights
            </p>
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
              <p>Your CV has been optimized successfully</p>
            </div>
          </div>

          {/* Summary Evaluation Card */}
          <div className="evaluation-card">
            <div className="evaluation-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <h2>Summary Evaluation</h2>
            </div>

            <div className="metrics-grid">
              {/* Word Count */}
              <div className="metric-card">
                <div className="metric-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7V4h16v3" />
                    <path d="M9 20h6" />
                    <path d="M12 4v16" />
                  </svg>
                  <span>Word Count</span>
                </div>
                <div className="metric-values">
                  <div className="metric-before">
                    <span className="label">Before</span>
                    <span className="value">{results.wordCount.before}</span>
                  </div>
                  <span className="metric-arrow">→</span>
                  <div className="metric-after">
                    <span className="label">After</span>
                    <span className="value green">{results.wordCount.after}</span>
                  </div>
                </div>
                <span className="metric-change green">{results.wordCount.change}</span>
              </div>

              {/* Readability Score */}
              <div className="metric-card">
                <div className="metric-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>Readability Score</span>
                </div>
                <div className="metric-values">
                  <div className="metric-before">
                    <span className="label">Before</span>
                    <span className="value">{results.readabilityScore.before}</span>
                  </div>
                  <span className="metric-arrow">→</span>
                  <div className="metric-after">
                    <span className="label">After</span>
                    <span className="value green">{results.readabilityScore.after}</span>
                  </div>
                </div>
                <span className="metric-change green">{results.readabilityScore.change}</span>
              </div>
            </div>

            {/* Overall Score */}
            <div className="overall-score-card">
              <div className="overall-score-left">
                <div className="overall-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="overall-info">
                  <span className="overall-label">Overall Improvement Score</span>
                  <span className="overall-value">{results.overallScore}</span>
                </div>
              </div>
              <div className="overall-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                </svg>
                {results.rating}
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="insights-card">
            <h2 className="insights-title">Insights & Recommendations</h2>
            <p className="insights-subtitle">Key improvements made to your CV</p>
            
            <ul className="insights-list">
              {results.insights.map((insight, index) => (
                <li key={index} className="insight-item">
                  <div className="insight-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Button */}
          <button className="download-btn" onClick={handleDownload}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Optimized CV
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVOptimizationResults;

