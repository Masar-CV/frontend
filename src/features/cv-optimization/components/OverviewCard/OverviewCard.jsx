import { getGradeColor, getScoreColor } from '../../types';
import './OverviewCard.css';

/**
 * OverviewCard Component
 * Displays the quality score, grade, optimization ID, and download button
 */
const OverviewCard = ({ 
  qualityScore, 
  grade, 
  optimizationId, 
  fileName,
  onDownload 
}) => {
  const gradeColor = getGradeColor(grade);
  const scoreColor = getScoreColor(qualityScore);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (qualityScore / 100) * circumference;

  return (
    <div className="overview-card">
      <div className="overview-header">
        <h2 className="overview-title">CV Analysis Overview</h2>
        <span className="optimization-id">ID: #{optimizationId}</span>
      </div>

      <div className="overview-content">
        <div className="score-section">
          <div className="score-circle-container">
            <svg className="score-circle" viewBox="0 0 120 120">
              <circle
                className="score-circle-bg"
                cx="60"
                cy="60"
                r="54"
                strokeWidth="8"
                fill="none"
              />
              <circle
                className="score-circle-progress"
                cx="60"
                cy="60"
                r="54"
                strokeWidth="8"
                fill="none"
                style={{
                  stroke: scoreColor,
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset
                }}
              />
            </svg>
            <div className="score-value">
              <span className="score-number">{qualityScore}</span>
              <span className="score-label">Score</span>
            </div>
          </div>
        </div>

        <div className="grade-section">
          <div 
            className="grade-badge"
            style={{ backgroundColor: `${gradeColor}15`, color: gradeColor }}
          >
            <span className="grade-label">Grade</span>
            <span className="grade-value">{grade}</span>
          </div>
        </div>

        <div className="download-section">
          <p className="file-name">{fileName}</p>
          <button className="download-btn" onClick={onDownload}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Optimized CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
