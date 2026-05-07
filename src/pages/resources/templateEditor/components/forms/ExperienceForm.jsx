const ExperienceForm = ({ experiences, onAddExperience, onExperienceChange, onRemoveExperience }) => (
  <div className="editor-repeater">
    {experiences.map((experience, index) => (
      <div key={experience.id} className="editor-repeater-card">
        <div className="editor-repeater-card-header">
          <h4>Experience #{index + 1}</h4>
          {experiences.length > 1 && (
            <button type="button" className="editor-link-danger" onClick={() => onRemoveExperience(index)}>
              Remove
            </button>
          )}
        </div>

        <label className="editor-form-group">
          <span className="editor-form-label">Role</span>
          <input
            type="text"
            className="editor-input"
            value={experience.role}
            onChange={(event) => onExperienceChange(index, 'role', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Company</span>
          <input
            type="text"
            className="editor-input"
            value={experience.company}
            onChange={(event) => onExperienceChange(index, 'company', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Period</span>
          <input
            type="text"
            className="editor-input"
            value={experience.period}
            onChange={(event) => onExperienceChange(index, 'period', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Location / Work Type</span>
          <input
            type="text"
            className="editor-input"
            value={experience.location || ''}
            placeholder="On-site | Full-Time"
            onChange={(event) => onExperienceChange(index, 'location', event.target.value)}
          />
        </label>
        <label className="editor-form-group">
          <span className="editor-form-label">Description</span>
          <textarea
            className="editor-textarea editor-textarea--compact"
            rows={3}
            value={experience.description}
            onChange={(event) => onExperienceChange(index, 'description', event.target.value)}
          />
        </label>
      </div>
    ))}
    <button type="button" className="editor-add-button" onClick={onAddExperience}>
      + Add Experience
    </button>
  </div>
);

export default ExperienceForm;
