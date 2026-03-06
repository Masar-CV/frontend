import { GraduationIcon, EditIcon } from '../shared/Icons';
import { STATIC_EDUCATION } from '../../constants';
import './EducationSection.css';

const EducationSection = () => (
  <div className="profile-card">
    <div className="card-header">
      <h2 className="card-title">
        <GraduationIcon />
        Education
      </h2>
      <button className="card-edit-btn">
        <EditIcon />
      </button>
    </div>
    <div className="education-list">
      {STATIC_EDUCATION.map((edu) => (
        <div key={edu.id} className="education-item">
          <div className="edu-icon">
            <GraduationIcon size={24} />
          </div>
          <div className="edu-content">
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-institution">{edu.institution}</p>
            <p className="edu-details">
              <span>{edu.year}</span>
              <span className="edu-separator">GPA:</span>
              <span>{edu.gpa}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EducationSection;
