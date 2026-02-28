import './SummaryContact.css';

/**
 * SummaryContact Component
 * Displays candidate name, contact information, and generated summary
 */
const SummaryContact = ({ metadata, contactInfo, summary, summaryEvaluation }) => {
  const { candidate_name, original_filename, file_type, page_count } = metadata || {};
  const { email, phone, links } = contactInfo || {};

  return (
    <div className="summary-contact-card">
      {/* Candidate Header */}
      <div className="candidate-header">
        <div className="candidate-avatar">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className="candidate-info">
          <h2 className="candidate-name">{candidate_name || 'Unknown Candidate'}</h2>
          <div className="file-meta">
            <span className="file-badge">{file_type}</span>
            <span className="page-count">{page_count} page{page_count !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="contact-section">
        <h3 className="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Contact Information
        </h3>
        <div className="contact-grid">
          {email && (
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${email}`} className="contact-link">{email}</a>
            </div>
          )}
          {phone && (
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{phone}</span>
            </div>
          )}
        </div>
        
        {links && links.length > 0 && (
          <div className="links-section">
            <h4 className="links-title">Links</h4>
            <div className="links-list">
              {links.map((link, index) => (
                <a 
                  key={index} 
                  href={link.startsWith('http') ? link : `https://${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-chip"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-header">
          <h3 className="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Professional Summary
          </h3>
          {summaryEvaluation && (
            <div className="summary-stats">
              <span className="stat-badge">
                {summaryEvaluation.word_count} words
              </span>
              <span 
                className="stat-badge grade"
                style={{ 
                  backgroundColor: summaryEvaluation.grade === 'A' ? '#dcfce7' : 
                                   summaryEvaluation.grade === 'B' ? '#dbeafe' : '#fef3c7',
                  color: summaryEvaluation.grade === 'A' ? '#166534' : 
                         summaryEvaluation.grade === 'B' ? '#1e40af' : '#92400e'
                }}
              >
                Grade: {summaryEvaluation.grade}
              </span>
            </div>
          )}
        </div>
        <p className="summary-text">{summary}</p>
        
        {summaryEvaluation?.issues && summaryEvaluation.issues.length > 0 && (
          <div className="summary-issues">
            <h4 className="issues-title">Suggestions for Improvement</h4>
            <ul className="issues-list">
              {summaryEvaluation.issues.map((issue, index) => (
                <li key={index} className="issue-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryContact;
