const EducationForm = ({ education, onAddEducation, onEducationChange, onRemoveEducation }) => (
  <div className="editor-repeater">
    {education.map((item, index) => (
      <div key={item.id} className="editor-repeater-card">
        <div className="editor-repeater-card-header">
          <h4>Education #{index + 1}</h4>
          {education.length > 1 && (
            <button type="button" className="editor-link-danger" onClick={() => onRemoveEducation(index)}>
              Remove
            </button>
          )}
        </div>

        <label className="editor-form-group">
          <span className="editor-form-label">Degree</span>
          <input
            type="text"
            className="editor-input"
            value={item.degree}
            onChange={(event) => onEducationChange(index, 'degree', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Institution</span>
          <input
            type="text"
            className="editor-input"
            value={item.institution}
            onChange={(event) => onEducationChange(index, 'institution', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Year</span>
          <input
            type="text"
            className="editor-input"
            value={item.year}
            onChange={(event) => onEducationChange(index, 'year', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Location</span>
          <input
            type="text"
            className="editor-input"
            value={item.location || ''}
            onChange={(event) => onEducationChange(index, 'location', event.target.value)}
          />
        </label>
      </div>
    ))}
    <button type="button" className="editor-add-button" onClick={onAddEducation}>
      + Add Education
    </button>
  </div>
);

export default EducationForm;
