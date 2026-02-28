import { getScoreColor, getGradeColor } from '../../types';
import './EvaluationBreakdown.css';

/**
 * EvaluationBreakdown Component
 * Displays quality report breakdown with progress bars and validation warnings
 */
const EvaluationBreakdown = ({ evaluation, validation }) => {
  const { quality_report, experience_original, experience_fixed } = evaluation || {};
  const { breakdown, recommendations } = quality_report || {};

  return (
    <div className="evaluation-breakdown-container">
      {/* Quality Breakdown Card */}
      <div className="eb-card">
        <div className="eb-header">
          <h2 className="eb-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Quality Breakdown
          </h2>
          {quality_report && (
            <div 
              className="overall-grade"
              style={{ 
                backgroundColor: `${getGradeColor(quality_report.grade)}15`,
                color: getGradeColor(quality_report.grade)
              }}
            >
              <span className="grade-label">Overall</span>
              <span className="grade-value">{quality_report.grade}</span>
            </div>
          )}
        </div>

        {breakdown && breakdown.length > 0 ? (
          <div className="breakdown-list">
            {breakdown.map((item, index) => {
              const percentage = (item.score / item.max) * 100;
              const color = getScoreColor(item.score, item.max);
              
              return (
                <div key={index} className="breakdown-item">
                  <div className="breakdown-info">
                    <span className="breakdown-name">{item.name}</span>
                    <span className="breakdown-score">
                      {item.score}/{item.max}
                    </span>
                  </div>
                  <div className="breakdown-bar">
                    <div 
                      className="breakdown-progress"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-data">No breakdown data available</p>
        )}
      </div>

      {/* Experience Comparison Card */}
      {experience_original && experience_fixed && (
        <div className="eb-card">
          <h2 className="eb-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Experience Improvement
          </h2>

          <div className="experience-comparison">
            <div className="comparison-card original">
              <span className="comparison-label">Original</span>
              <div className="comparison-stats">
                <div className="stat-row">
                  <span>Average Score</span>
                  <strong>{experience_original.average_score.toFixed(1)}/10</strong>
                </div>
                <div className="stat-row">
                  <span>Strong Bullets</span>
                  <strong>{experience_original.strong_percentage.toFixed(1)}%</strong>
                </div>
                <div className="stat-row">
                  <span>Overall Score</span>
                  <strong>{experience_original.overall_score}</strong>
                </div>
              </div>
              <div 
                className="comparison-grade"
                style={{ 
                  backgroundColor: `${getGradeColor(experience_original.grade)}15`,
                  color: getGradeColor(experience_original.grade)
                }}
              >
                Grade: {experience_original.grade}
              </div>
            </div>

            <div className="comparison-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="comparison-card fixed">
              <span className="comparison-label improved">Improved</span>
              <div className="comparison-stats">
                <div className="stat-row">
                  <span>Average Score</span>
                  <strong>{experience_fixed.average_score.toFixed(1)}/10</strong>
                </div>
                <div className="stat-row">
                  <span>Strong Bullets</span>
                  <strong>{experience_fixed.strong_percentage.toFixed(1)}%</strong>
                </div>
                <div className="stat-row">
                  <span>Overall Score</span>
                  <strong>{experience_fixed.overall_score}</strong>
                </div>
              </div>
              <div 
                className="comparison-grade"
                style={{ 
                  backgroundColor: `${getGradeColor(experience_fixed.grade)}15`,
                  color: getGradeColor(experience_fixed.grade)
                }}
              >
                Grade: {experience_fixed.grade}
              </div>
            </div>
          </div>

          <div className="improvement-summary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span>
              Score improved by{' '}
              <strong>
                +{(experience_fixed.overall_score - experience_original.overall_score).toFixed(0)}
              </strong>{' '}
              points
            </span>
          </div>
        </div>
      )}

      {/* Validation & Warnings Card */}
      {validation && (
        <div className="eb-card">
          <div className="eb-header">
            <h2 className="eb-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Validation
            </h2>
            <div className={`validation-badge ${validation.is_valid ? 'valid' : 'invalid'}`}>
              {validation.is_valid ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Valid
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Invalid
                </>
              )}
            </div>
          </div>

          <div className="validation-score">
            <span>Validation Score:</span>
            <strong 
              style={{ color: getScoreColor(validation.score) }}
            >
              {validation.score}/100
            </strong>
          </div>

          {validation.warnings && validation.warnings.length > 0 && (
            <div className="warnings-section">
              <h3 className="warnings-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Warnings
              </h3>
              <ul className="warnings-list">
                {validation.warnings.map((warning, index) => (
                  <li key={index} className="warning-item">
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {validation.issues && validation.issues.length > 0 && (
            <div className="issues-section">
              <h3 className="issues-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Issues
              </h3>
              <ul className="issues-list">
                {validation.issues.map((issue, index) => (
                  <li key={index} className="issue-item">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="eb-card">
          <h2 className="eb-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Recommendations
          </h2>
          <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
              <li key={index} className="recommendation-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EvaluationBreakdown;
