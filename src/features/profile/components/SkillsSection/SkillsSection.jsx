import ProfileModal from '../shared/ProfileModal';
import { SkillsIcon, PlusIcon, EditIcon, DeleteIcon } from '../shared/Icons';
import { PROFICIENCY_LABELS, getSkillLevelColor } from '../../constants';
import './SkillsSection.css';

const SkillsSection = ({
  skills,
  isModalOpen, editingSkill, form, saving, error,
  onAdd, onEdit, onClose, onChange, onSave, onDelete,
}) => (
  <>
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <SkillsIcon />
          Skills
        </h2>
        <button className="card-edit-btn" onClick={onAdd} title="Add skill">
          <PlusIcon />
        </button>
      </div>
      {skills.length > 0 ? (
        <div className="skills-list">
          {skills.map((skill) => {
            const levelName = skill.proficiencyLevelName || PROFICIENCY_LABELS[skill.proficiencyLevel] || '';
            const percentage = (skill.proficiencyLevel / 5) * 100;
            return (
              <div key={skill.skillID} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.skillName}</span>
                  <div className="skill-actions">
                    <span className="skill-level" style={{ color: getSkillLevelColor(skill.proficiencyLevel) }}>
                      {levelName}
                    </span>
                    <button className="skill-action-btn" onClick={() => onEdit(skill)} title="Edit skill">
                      <EditIcon />
                    </button>
                    <button className="skill-action-btn skill-delete-btn" onClick={() => onDelete(skill.skillID)} title="Delete skill">
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getSkillLevelColor(skill.proficiencyLevel),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="section-empty">No skills added yet. Click + to add your first skill.</p>
      )}
    </div>

    {isModalOpen && (
      <ProfileModal title={editingSkill ? 'Edit Skill' : 'Add Skill'} onClose={onClose}>
        <form className="profile-modal-form" onSubmit={onSave}>
          <div className="profile-form-group">
            <label htmlFor="skillName">Skill Name</label>
            <input id="skillName" name="skillName" type="text" value={form.skillName} onChange={onChange} placeholder="e.g. React, Python, .NET" required />
          </div>
          <div className="profile-form-group">
            <label htmlFor="proficiencyLevel">Proficiency Level</label>
            <select id="proficiencyLevel" name="proficiencyLevel" className="profile-select" value={form.proficiencyLevel} onChange={onChange}>
              {[1, 2, 3, 4, 5].map((lvl) => (
                <option key={lvl} value={lvl}>{lvl} — {PROFICIENCY_LABELS[lvl]}</option>
              ))}
            </select>
          </div>
          {error && <p className="profile-form-error">{error}</p>}
          <div className="profile-modal-actions">
            <button type="button" className="profile-btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="profile-btn-save" disabled={saving}>{saving ? 'Saving...' : editingSkill ? 'Update' : 'Add Skill'}</button>
          </div>
        </form>
      </ProfileModal>
    )}
  </>
);

export default SkillsSection;
