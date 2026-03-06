import { CloseIcon } from './Icons';
import './ProfileModal.css';

const ProfileModal = ({ title, onClose, children }) => (
  <div className="profile-modal-overlay" onClick={onClose}>
    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
      <div className="profile-modal-header">
        <h2>{title}</h2>
        <button className="profile-modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      </div>
      <div className="profile-modal-body">
        {children}
      </div>
    </div>
  </div>
);

export default ProfileModal;
