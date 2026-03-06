import ProfileModal from '../shared/ProfileModal';
import { BriefcaseIcon, PlusIcon, EditIcon, DeleteIcon } from '../shared/Icons';
import { formatDateDisplay } from '../../constants';
import './ExperienceSection.css';

const ExperienceSection = ({
  experiences,
  isModalOpen, editingExp, form, saving, error,
  onAdd, onEdit, onClose, onChange, onSave, onDelete,
}) => (
  <>
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <BriefcaseIcon />
          Experience
        </h2>
        <button className="card-edit-btn" onClick={onAdd} title="Add experience">
          <PlusIcon />
        </button>
      </div>
      {experiences.length > 0 ? (
        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.experienceID} className="experience-item">
              <div className="exp-header-row">
                <div>
                  <h3 className="exp-title">{exp.title}</h3>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-period">
                    {formatDateDisplay(exp.startDate)} — {exp.isCurrentJob ? 'Present' : formatDateDisplay(exp.endDate)}
                  </p>
                </div>
                <div className="exp-actions">
                  <button className="exp-action-btn" onClick={() => onEdit(exp)} title="Edit experience">
                    <EditIcon />
                  </button>
                  <button className="exp-action-btn exp-delete-btn" onClick={() => onDelete(exp.experienceID)} title="Delete experience">
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              {exp.description && <p className="exp-description">{exp.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="section-empty">No experiences added yet. Click + to add your first experience.</p>
      )}
    </div>

    {isModalOpen && (
      <ProfileModal title={editingExp ? 'Edit Experience' : 'Add Experience'} onClose={onClose}>
        <form className="profile-modal-form" onSubmit={onSave}>
          <div className="profile-form-group">
            <label htmlFor="expTitle">Job Title</label>
            <input id="expTitle" name="title" type="text" value={form.title} onChange={onChange} placeholder="e.g. Software Engineer" required />
          </div>
          <div className="profile-form-group">
            <label htmlFor="expCompany">Company</label>
            <input id="expCompany" name="company" type="text" value={form.company} onChange={onChange} placeholder="e.g. Google" required />
          </div>
          <div className="profile-form-group">
            <label htmlFor="expStartDate">Start Date</label>
            <input id="expStartDate" name="startDate" type="date" value={form.startDate} onChange={onChange} required />
          </div>
          <div className="profile-form-group">
            <label className="profile-checkbox-label">
              <input type="checkbox" name="isCurrentJob" checked={form.isCurrentJob} onChange={onChange} />
              I currently work here
            </label>
          </div>
          {!form.isCurrentJob && (
            <div className="profile-form-group">
              <label htmlFor="expEndDate">End Date</label>
              <input id="expEndDate" name="endDate" type="date" value={form.endDate} onChange={onChange} />
            </div>
          )}
          <div className="profile-form-group">
            <label htmlFor="expDescription">Description</label>
            <textarea id="expDescription" name="description" className="profile-textarea" value={form.description} onChange={onChange} placeholder="Describe your responsibilities and achievements..." rows={4} />
          </div>
          {error && <p className="profile-form-error">{error}</p>}
          <div className="profile-modal-actions">
            <button type="button" className="profile-btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="profile-btn-save" disabled={saving}>{saving ? 'Saving...' : editingExp ? 'Update' : 'Add Experience'}</button>
          </div>
        </form>
      </ProfileModal>
    )}
  </>
);

export default ExperienceSection;
