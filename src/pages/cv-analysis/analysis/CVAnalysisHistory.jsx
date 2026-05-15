const formatHistoryDate = (value) => {
  if (!value) return 'Unknown date';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const CVAnalysisHistory = ({
  historyItems,
  isHistoryLoading,
  historyErrorMessage,
  handleOpenHistoryItem,
}) => (
  <section className="cv-history-section" aria-labelledby="cv-history-title">
    <div className="cv-history-header">
      <div>
        <h2 id="cv-history-title">Previous analyses</h2>
        <p>Recent CV and job description match results.</p>
      </div>
    </div>

    {isHistoryLoading ? (
      <p className="cv-history-state">Loading analysis history...</p>
    ) : historyErrorMessage ? (
      <p className="cv-history-state error">{historyErrorMessage}</p>
    ) : historyItems.length === 0 ? (
      <p className="cv-history-state">No analysis history yet.</p>
    ) : (
      <div className="cv-history-list">
        {historyItems.map((item) => {
          const score = Math.round(Number(item.finalScore) || 0);
          const scoreColor = item.color || '#2563eb';

          return (
            <button
              className="cv-history-item"
              key={item.id}
              type="button"
              onClick={() => handleOpenHistoryItem(item.id)}
            >
              <div className="cv-history-item-top">
                <div className="cv-history-file">
                  <span className="cv-history-file-icon" aria-hidden="true">
                    CV
                  </span>
                  <div>
                    <h3>{item.originalFileName || 'Untitled CV'}</h3>
                    <span>{formatHistoryDate(item.createdAt)}</span>
                  </div>
                </div>

                <span
                  className="cv-history-grade"
                  style={{
                    color: scoreColor,
                    borderColor: scoreColor,
                    backgroundColor: `${scoreColor}14`,
                  }}
                >
                  {item.grade || 'Not graded'}
                </span>
              </div>

              <div className="cv-history-score-row">
                <div
                  className="cv-history-score-track"
                  aria-label={`Score ${score}%`}
                >
                  <div
                    className="cv-history-score-fill"
                    style={{
                      width: `${Math.min(Math.max(score, 0), 100)}%`,
                      backgroundColor: scoreColor,
                    }}
                  />
                </div>

                <strong style={{ color: scoreColor }}>{score}%</strong>
              </div>
            </button>
          );
        })}
      </div>
    )}
  </section>
);

export default CVAnalysisHistory;
