const SummaryForm = ({ summary, onSummaryChange }) => (
  <div className="editor-form-group-list">
    <label className="editor-form-group">
      <span className="editor-form-label">Professional Summary</span>
      <textarea
        className="editor-textarea"
        rows={8}
        value={summary}
        onChange={(event) => onSummaryChange(event.target.value)}
      />
    </label>
  </div>
);

export default SummaryForm;
