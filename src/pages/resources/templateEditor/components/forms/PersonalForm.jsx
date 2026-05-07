import { PERSONAL_FIELDS } from '../../templateEditorConfig';

const PersonalForm = ({ personal, onPersonalChange }) => (
  <div className="editor-form-group-list">
    {PERSONAL_FIELDS.map((field) => (
      <label className="editor-form-group" key={field.key}>
        <span className="editor-form-label">{field.label}</span>
        <input
          type="text"
          className="editor-input"
          value={personal[field.key] || ''}
          placeholder={field.placeholder}
          onChange={(event) => onPersonalChange(field.key, event.target.value)}
        />
      </label>
    ))}
  </div>
);

export default PersonalForm;
