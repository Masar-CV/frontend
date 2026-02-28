import { useState } from 'react';
import { getScoreColor } from '../../types';
import './ExperienceAnalyzer.css';

/**
 * ExperienceAnalyzer Component
 * Displays experience entries with achievement comparison view
 */
const ExperienceAnalyzer = ({ experienceAnalyzed, experienceFixStats }) => {
  const [expandedJobs, setExpandedJobs] = useState(
    experienceAnalyzed?.map((_, i) => i === 0) || []
  );

  const toggleJob = (index) => {
    setExpandedJobs(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (!experienceAnalyzed || experienceAnalyzed.length === 0) {
    return (
      <div className="experience-analyzer-card">
        <h2 className="analyzer-title">Experience Analysis</h2>
        <p className="no-data">No experience data available</p>
      </div>
    );
  }

  return (
    <div className="experience-analyzer-card">
      <div className="analyzer-header">
        <h2 className="analyzer-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Experience Analysis
        </h2>
        {experienceFixStats && (
          <div className="fix-stats">
            <span className="fix-stat">
              <strong>{experienceFixStats.fixed_bullets}</strong> of{' '}
              <strong>{experienceFixStats.total_bullets}</strong> bullets improved
            </span>
          </div>
        )}
      </div>

      <div className="experience-list">
        {experienceAnalyzed.map((job, jobIndex) => (
          <div key={jobIndex} className="job-entry">
            <button 
              className={`job-header ${expandedJobs[jobIndex] ? 'expanded' : ''}`}
              onClick={() => toggleJob(jobIndex)}
            >
              <div className="job-info">
                <h3 className="job-title">{job.parsed_header?.title || 'Position'}</h3>
                <span className="job-company">{job.parsed_header?.company}</span>
                <span className="job-dates">{job.parsed_header?.dates}</span>
              </div>
              <div className="job-toggle">
                <span className="achievement-count">
                  {job.achievements?.length || 0} achievements
                </span>
                <svg 
                  className="toggle-icon" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {expandedJobs[jobIndex] && job.achievements && (
              <div className="achievements-list">
                {job.achievements.map((achievement, achIndex) => (
                  <AchievementItem 
                    key={achIndex} 
                    achievement={achievement} 
                    index={achIndex}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * AchievementItem Component
 * Displays single achievement with comparison if fixed
 */
const AchievementItem = ({ achievement, index }) => {
  const { text, score, feedback, fixed, fixed_score, changes, was_fixed } = achievement;
  
  const originalColor = getScoreColor(score, 10);
  const fixedColor = fixed_score ? getScoreColor(fixed_score, 10) : null;

  return (
    <div className={`achievement-item ${was_fixed ? 'has-fix' : ''}`}>
      <div className="achievement-number">{index + 1}</div>
      
      <div className="achievement-content">
        {/* Original Text */}
        <div className="original-section">
          <div className="section-label">
            <span className="label-text">Original</span>
            <span 
              className="score-badge"
              style={{ backgroundColor: `${originalColor}20`, color: originalColor }}
            >
              Score: {score}/10
            </span>
          </div>
          <p className="achievement-text">{text}</p>
          
          {feedback && feedback.length > 0 && (
            <div className="feedback-badges">
              {feedback.map((item, i) => (
                <span key={i} className="feedback-badge">{item}</span>
              ))}
            </div>
          )}
        </div>

        {/* Fixed Text (if available) */}
        {was_fixed && fixed && (
          <div className="fixed-section">
            <div className="section-label">
              <span className="label-text improved">Improved</span>
              <span 
                className="score-badge"
                style={{ backgroundColor: `${fixedColor}20`, color: fixedColor }}
              >
                Score: {fixed_score}/10
              </span>
              <span className="improvement-badge">
                +{fixed_score - score}
              </span>
            </div>
            <p className="achievement-text fixed">{fixed}</p>
            
            {changes && changes.length > 0 && (
              <div className="changes-list">
                <span className="changes-label">Changes applied:</span>
                {changes.map((change, i) => (
                  <span key={i} className="change-chip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {change}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* No fix needed indicator */}
        {!was_fixed && score >= 7 && (
          <div className="no-fix-needed">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Strong achievement - no changes needed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceAnalyzer;
