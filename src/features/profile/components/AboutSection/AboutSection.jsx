import ProfileModal from '../shared/ProfileModal';
import { EditIcon } from '../shared/Icons';
import './AboutSection.css';

const AboutSection = ({
  about,
  isEditing, aboutText, setAboutText, saving, error,
  onEditOpen, onEditClose, onSave,
}) => (
  <>
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">About</h2>
        <button className="card-edit-btn" onClick={onEditOpen}>
          <EditIcon />
        </button>
      </div>
      <p className="about-text">{about || 'No about information yet. Click the edit button to add one.'}</p>
    </div>

    {isEditing && (
      <ProfileModal title="Edit About" onClose={onEditClose}>
        <form className="profile-modal-form" onSubmit={onSave}>
          <div className="profile-form-group">
            <label htmlFor="aboutText">About</label>
            <textarea
              id="aboutText"
              className="profile-textarea"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Write something about yourself..."
              rows={5}
            />
          </div>
          {error && <p className="profile-form-error">{error}</p>}
          <div className="profile-modal-actions">
            <button type="button" className="profile-btn-cancel" onClick={onEditClose} disabled={saving}>Cancel</button>
            <button type="submit" className="profile-btn-save" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </ProfileModal>
    )}
  </>
);

export default AboutSection;
