const SkillsForm = ({ skills, skillsInput, onSkillsChange }) => (
  <div className="editor-form-group-list">
    <label className="editor-form-group">
      <span className="editor-form-label">Skills (comma separated)</span>
      <input
        type="text"
        className="editor-input"
        value={skillsInput}
        onChange={(event) => onSkillsChange(event.target.value)}
        placeholder="React, JavaScript, Figma, UI/UX"
      />
    </label>
    <div className="editor-chip-list">
      {skills.map((skill, index) => (
        <span key={`${skill}-${index}`} className="editor-chip">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default SkillsForm;
