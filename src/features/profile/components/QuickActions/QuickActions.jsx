import { DownloadIcon, EmailIcon, CalendarIcon } from '../shared/Icons';
import './QuickActions.css';

const QuickActions = () => (
  <div className="profile-card">
    <h2 className="card-title">Quick Actions</h2>
    <div className="quick-actions">
      <button className="action-item">
        <DownloadIcon />
        Download CV
      </button>
      <button className="action-item">
        <EmailIcon />
        Email Preferences
      </button>
      <button className="action-item">
        <CalendarIcon />
        Certifications
      </button>
    </div>
  </div>
);

export default QuickActions;
