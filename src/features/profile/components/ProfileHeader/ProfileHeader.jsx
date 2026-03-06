import ProfileModal from '../shared/ProfileModal';
import { UserIcon, PhoneIcon, LocationIcon, LinkedInIcon, GitHubIcon } from '../shared/Icons';
import './ProfileHeader.css';

const ProfileHeader = ({
  profile,
  isEditing, editForm, saving, saveError,
  onEditOpen, onEditClose, onFormChange, onSave,
}) => (
  <>
    <section className="profile-header">
      <div className="profile-header-content">
        <div className="profile-avatar">
          <UserIcon />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{profile?.fullName || '—'}</h1>
          <p className="profile-title">Software Engineer</p>
          <div className="profile-contact">
            {profile?.phone && (
              <span className="contact-item">
                <PhoneIcon />
                {profile.phone}
              </span>
            )}
            {profile?.location && (
              <span className="contact-item">
                <LocationIcon />
                {profile.location}
              </span>
            )}
            {profile?.linkedInURL && (
              <a className="contact-item" href={profile.linkedInURL} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
                LinkedIn
              </a>
            )}
            {profile?.githubURL && (
              <a className="contact-item" href={profile.githubURL} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                GitHub
              </a>
            )}
          </div>
        </div>
        <button className="edit-profile-btn" onClick={onEditOpen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Profile
        </button>
      </div>
    </section>

    {isEditing && (
      <ProfileModal title="Edit Profile" onClose={onEditClose}>
        <form className="profile-modal-form" onSubmit={onSave}>
          <div className="profile-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" value={editForm.fullName} onChange={onFormChange} placeholder="Your full name" required />
          </div>
          <div className="profile-form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={editForm.phone} onChange={onFormChange} placeholder="+20XXXXXXXXXX" />
          </div>
          <div className="profile-form-group">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" type="text" value={editForm.location} onChange={onFormChange} placeholder="City, Country" />
          </div>
          <div className="profile-form-group">
            <label htmlFor="linkedInURL">LinkedIn URL</label>
            <input id="linkedInURL" name="linkedInURL" type="url" value={editForm.linkedInURL} onChange={onFormChange} placeholder="https://linkedin.com/in/yourprofile" />
          </div>
          <div className="profile-form-group">
            <label htmlFor="githubURL">GitHub URL</label>
            <input id="githubURL" name="githubURL" type="url" value={editForm.githubURL} onChange={onFormChange} placeholder="https://github.com/yourusername" />
          </div>
          {saveError && <p className="profile-form-error">{saveError}</p>}
          <div className="profile-modal-actions">
            <button type="button" className="profile-btn-cancel" onClick={onEditClose} disabled={saving}>Cancel</button>
            <button type="submit" className="profile-btn-save" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </form>
      </ProfileModal>
    )}
  </>
);

export default ProfileHeader;
