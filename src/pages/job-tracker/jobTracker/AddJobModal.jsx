import { JOB_APPLICATION_STATUS_LABELS } from '../../../services/jobApplicationService';

const AddJobModal = ({
  formData,
  isEditing,
  isSubmitting,
  error,
  onChange,
  onClose,
  onSubmit,
}) => (
  <div className="job-tracker-modal-backdrop" role="presentation">
    <section
      className="job-tracker-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-application-form-title"
    >
      <div className="job-tracker-modal-head">
        <h2 id="job-application-form-title">
          {isEditing ? 'Edit Job Application' : 'Add Job Application'}
        </h2>
        <button
          type="button"
          className="job-tracker-icon-btn"
          aria-label="Close add job form"
          onClick={onClose}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>

      <form className="job-tracker-form" onSubmit={onSubmit}>
        <label>
          <span>Company</span>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            required
            placeholder="Company name"
          />
        </label>

        <label>
          <span>Position</span>
          <input
            name="position"
            value={formData.position}
            onChange={onChange}
            required
            placeholder="Role title"
          />
        </label>

        <label>
          <span>Location</span>
          <input
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="City, country or Remote"
          />
        </label>

        <label>
          <span>Salary range</span>
          <input
            name="salaryRange"
            value={formData.salaryRange}
            onChange={onChange}
            placeholder="$80,000 - $100,000"
          />
        </label>

        <label>
          <span>Contact</span>
          <input
            name="contactName"
            value={formData.contactName}
            onChange={onChange}
            placeholder="Recruiter or contact name"
          />
        </label>

        <label>
          <span>Status</span>
          <select name="status" value={formData.status} onChange={onChange}>
            {Object.entries(JOB_APPLICATION_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Applied date</span>
          <input
            name="appliedDate"
            type="date"
            value={formData.appliedDate}
            onChange={onChange}
            required
          />
        </label>

        <label className="job-tracker-form-wide">
          <span>Notes</span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={onChange}
            rows="4"
            placeholder="Next steps, links, interview notes"
          />
        </label>

        {error && <p className="job-tracker-form-error">{error}</p>}

        <div className="job-tracker-form-actions">
          <button type="button" className="job-tracker-secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="job-tracker-primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Update job' : 'Save job'}
          </button>
        </div>
      </form>
    </section>
  </div>
);

export default AddJobModal;
