import ProfileModal from '../shared/ProfileModal';
import { GraduationIcon, PlusIcon, EditIcon } from '../shared/Icons';
import './EducationSection.css';

const formatYear = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return String(date.getFullYear());
};

const getEducationId = (item, index) => item.educationID || item.educationId || item.id || index;
const getDegree = (item) => item.degree || item.degreeName || item.program || item.fieldOfStudy || item.major || 'Education';
const getInstitution = (item) => item.institution || item.university || item.school || item.college || '';
const getGpa = (item) => item.gpa || item.GPA || item.cgpa || item.grade || '';

const getPeriod = (item) => {
  if (item.year || item.graduationYear) return String(item.year || item.graduationYear);

  const start = item.startYear || formatYear(item.startDate);
  const end = item.endYear || formatYear(item.endDate);

  if (start && end) return `${start} - ${end}`;
  if (start) return `${start} - Present`;
  if (end) return String(end);
  return '';
};

const EducationSection = ({
  education = [],
  loading = false,
  error = null,
  isModalOpen = false,
  editingEducation = null,
  form = {
    degree: '',
    university: '',
    startYear: '',
    endYear: '',
    gpa: '',
    fieldOfStudy: '',
  },
  saving = false,
  saveError = null,
  onAdd,
  onEdit,
  onClose,
  onChange,
  onSave,
}) => (
  <>
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <GraduationIcon />
          Education
        </h2>
        <button type="button" className="card-edit-btn" onClick={onAdd} title="Add education">
          <PlusIcon />
        </button>
      </div>
      {loading ? (
        <p className="section-empty">Loading education...</p>
      ) : error ? (
        <p className="section-empty">{error}</p>
      ) : education.length > 0 ? (
        <div className="education-list">
          {education.map((edu, index) => {
            const period = getPeriod(edu);
            const gpa = getGpa(edu);
            const institution = getInstitution(edu);
            return (
              <div key={getEducationId(edu, index)} className="education-item">
                <div className="edu-icon">
                  <GraduationIcon size={24} />
                </div>
                <div className="edu-content">
                  <div className="edu-header-row">
                    <div>
                      <h3 className="edu-degree">{getDegree(edu)}</h3>
                      {institution && <p className="edu-institution">{institution}</p>}
                    </div>
                    {onEdit && (
                      <div className="edu-actions">
                        <button
                          type="button"
                          className="edu-action-btn"
                          onClick={() => onEdit(edu)}
                          title="Edit education"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    )}
                  </div>
                  {(period || gpa) && (
                    <p className="edu-details">
                      {period && <span>{period}</span>}
                      {gpa && (
                        <>
                          <span className="edu-separator">GPA:</span>
                          <span>{gpa}</span>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="section-empty">No education records found. Click + to add your first education.</p>
      )}
    </div>

    {isModalOpen && (
      <ProfileModal title={editingEducation ? 'Edit Education' : 'Add Education'} onClose={onClose}>
        <form className="profile-modal-form" onSubmit={onSave}>
          <div className="profile-form-group">
            <label htmlFor="eduDegree">Degree</label>
            <input
              id="eduDegree"
              name="degree"
              type="text"
              value={form.degree}
              onChange={onChange}
              placeholder="e.g. Bachelor"
              required
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="eduUniversity">University</label>
            <input
              id="eduUniversity"
              name="university"
              type="text"
              value={form.university}
              onChange={onChange}
              placeholder="e.g. Cairo University"
              required
            />
          </div>

          <div className="edu-form-row">
            <div className="profile-form-group">
              <label htmlFor="eduStartYear">Start Year</label>
              <input
                id="eduStartYear"
                name="startYear"
                type="number"
                min="1900"
                max="2100"
                value={form.startYear}
                onChange={onChange}
                placeholder="2018"
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="eduEndYear">End Year</label>
              <input
                id="eduEndYear"
                name="endYear"
                type="number"
                min="1900"
                max="2100"
                value={form.endYear}
                onChange={onChange}
                placeholder="2022"
                required
              />
            </div>
          </div>

          <div className="edu-form-row">
            <div className="profile-form-group">
              <label htmlFor="eduGpa">GPA</label>
              <input
                id="eduGpa"
                name="gpa"
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={form.gpa}
                onChange={onChange}
                placeholder="3.5"
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="eduFieldOfStudy">Field of Study</label>
              <input
                id="eduFieldOfStudy"
                name="fieldOfStudy"
                type="text"
                value={form.fieldOfStudy}
                onChange={onChange}
                placeholder="e.g. Computer Science"
                required
              />
            </div>
          </div>

          {saveError && <p className="profile-form-error">{saveError}</p>}
          <div className="profile-modal-actions">
            <button type="button" className="profile-btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="profile-btn-save" disabled={saving}>
              {saving ? 'Saving...' : editingEducation ? 'Update' : 'Add Education'}
            </button>
          </div>
        </form>
      </ProfileModal>
    )}
  </>
);

export default EducationSection;

