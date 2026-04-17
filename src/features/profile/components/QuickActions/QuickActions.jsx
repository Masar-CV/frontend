import { useState } from 'react';
import ProfileModal from '../shared/ProfileModal';
import profileService from '../../services/profileService';
import { DownloadIcon, EmailIcon, CalendarIcon, EditIcon, DeleteIcon } from '../shared/Icons';
import './QuickActions.css';

const DEFAULT_EMAIL_PREFERENCES = {
  jobAlerts: true,
  weeklyDigest: true,
  marketingEmails: true,
  securityAlerts: true,
};

const EMPTY_CERTIFICATION_FORM = {
  name: '',
  issuingOrganization: '',
  issueDate: '',
  expiryDate: '',
  credentialID: '',
  credentialURL: '',
};

const normalizeEmailPreferences = (payload) => {
  const raw = payload?.data && typeof payload.data === 'object' ? payload.data : payload;

  return {
    jobAlerts: !!(raw?.jobAlerts ?? DEFAULT_EMAIL_PREFERENCES.jobAlerts),
    weeklyDigest: !!(raw?.weeklyDigest ?? DEFAULT_EMAIL_PREFERENCES.weeklyDigest),
    marketingEmails: !!(raw?.marketingEmails ?? DEFAULT_EMAIL_PREFERENCES.marketingEmails),
    securityAlerts: !!(raw?.securityAlerts ?? DEFAULT_EMAIL_PREFERENCES.securityAlerts),
  };
};

const normalizeCertifications = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.certifications)) return payload.certifications;
  return [];
};

const normalizeCertificationItem = (payload) => {
  if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) return payload.data;
  if (payload?.certification && typeof payload.certification === 'object' && !Array.isArray(payload.certification)) return payload.certification;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) return payload;
  return null;
};

const getCertificationId = (item) => item?.certificationID || item?.certificationId || item?.id || null;

const formatDateForInput = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
  return d.toISOString().slice(0, 10);
};

const formatDateDisplay = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const toISODate = (value) => {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00Z`);
  if (!Number.isNaN(d.getTime())) return d.toISOString();

  const fallback = new Date(value);
  if (!Number.isNaN(fallback.getTime())) return fallback.toISOString();

  return value;
};

const QuickActions = () => {
  const [downloadingCV, setDownloadingCV] = useState(false);
  const [quickActionError, setQuickActionError] = useState(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailPreferences, setEmailPreferences] = useState(DEFAULT_EMAIL_PREFERENCES);
  const [loadingEmailPreferences, setLoadingEmailPreferences] = useState(false);
  const [savingEmailPreferences, setSavingEmailPreferences] = useState(false);
  const [emailPreferencesError, setEmailPreferencesError] = useState(null);

  const [isCertificationsModalOpen, setIsCertificationsModalOpen] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [loadingCertifications, setLoadingCertifications] = useState(false);
  const [certificationsError, setCertificationsError] = useState(null);
  const [isCertificationFormOpen, setIsCertificationFormOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [certificationForm, setCertificationForm] = useState(EMPTY_CERTIFICATION_FORM);
  const [savingCertification, setSavingCertification] = useState(false);
  const [deletingCertificationId, setDeletingCertificationId] = useState(null);

  const triggerFileDownload = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'profile-cv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadCV = async () => {
    try {
      setDownloadingCV(true);
      setQuickActionError(null);
      const { blob, fileName } = await profileService.downloadProfileCV();
      triggerFileDownload(blob, fileName);
    } catch {
      setQuickActionError('Failed to download CV.');
    } finally {
      setDownloadingCV(false);
    }
  };

  const openEmailPreferencesModal = async () => {
    setIsEmailModalOpen(true);
    setLoadingEmailPreferences(true);
    setEmailPreferencesError(null);
    setQuickActionError(null);

    try {
      const data = await profileService.getEmailPreferences();
      setEmailPreferences(normalizeEmailPreferences(data));
    } catch {
      setEmailPreferences(DEFAULT_EMAIL_PREFERENCES);
      setEmailPreferencesError('Failed to load email preferences. You can still update and save.');
    } finally {
      setLoadingEmailPreferences(false);
    }
  };

  const closeEmailPreferencesModal = () => {
    setIsEmailModalOpen(false);
    setEmailPreferencesError(null);
  };

  const changeEmailPreference = (e) => {
    const { name, checked } = e.target;
    setEmailPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const saveEmailPreferences = async (e) => {
    e.preventDefault();
    try {
      setSavingEmailPreferences(true);
      setEmailPreferencesError(null);
      const updated = await profileService.updateEmailPreferences(emailPreferences);
      setEmailPreferences(normalizeEmailPreferences(updated));
      setIsEmailModalOpen(false);
    } catch {
      setEmailPreferencesError('Failed to update email preferences.');
    } finally {
      setSavingEmailPreferences(false);
    }
  };

  const loadCertifications = async () => {
    const data = await profileService.getCertifications();
    setCertifications(normalizeCertifications(data));
  };

  const openCertificationsModal = async () => {
    setIsCertificationsModalOpen(true);
    setLoadingCertifications(true);
    setCertificationsError(null);
    setQuickActionError(null);
    setIsCertificationFormOpen(false);
    setEditingCertification(null);

    try {
      await loadCertifications();
    } catch {
      setCertifications([]);
      setCertificationsError('Failed to load certifications.');
    } finally {
      setLoadingCertifications(false);
    }
  };

  const closeCertificationsModal = () => {
    setIsCertificationsModalOpen(false);
    setCertificationsError(null);
    setIsCertificationFormOpen(false);
    setEditingCertification(null);
    setCertificationForm(EMPTY_CERTIFICATION_FORM);
  };

  const openAddCertificationForm = () => {
    setEditingCertification(null);
    setCertificationForm(EMPTY_CERTIFICATION_FORM);
    setCertificationsError(null);
    setIsCertificationFormOpen(true);
  };

  const openEditCertificationForm = (certification) => {
    setEditingCertification(certification);
    setCertificationForm({
      name: certification?.name || '',
      issuingOrganization: certification?.issuingOrganization || '',
      issueDate: formatDateForInput(certification?.issueDate),
      expiryDate: formatDateForInput(certification?.expiryDate),
      credentialID: certification?.credentialID || '',
      credentialURL: certification?.credentialURL || '',
    });
    setCertificationsError(null);
    setIsCertificationFormOpen(true);
  };

  const closeCertificationForm = () => {
    setEditingCertification(null);
    setCertificationForm(EMPTY_CERTIFICATION_FORM);
    setIsCertificationFormOpen(false);
  };

  const changeCertificationForm = (e) => {
    const { name, value } = e.target;
    setCertificationForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveCertification = async (e) => {
    e.preventDefault();
    try {
      setSavingCertification(true);
      setCertificationsError(null);

      const payload = {
        name: certificationForm.name.trim(),
        issuingOrganization: certificationForm.issuingOrganization.trim(),
        issueDate: toISODate(certificationForm.issueDate),
        expiryDate: certificationForm.expiryDate ? toISODate(certificationForm.expiryDate) : null,
        credentialID: certificationForm.credentialID.trim() || null,
        credentialURL: certificationForm.credentialURL.trim() || null,
      };

      if (editingCertification) {
        const certificationId = getCertificationId(editingCertification);
        if (!certificationId) throw new Error('Certification ID is missing');

        const updated = await profileService.updateCertification(certificationId, payload);
        const updatedItem = normalizeCertificationItem(updated);

        if (updatedItem) {
          setCertifications((prev) =>
            prev.map((item) => (getCertificationId(item) === certificationId ? updatedItem : item))
          );
        } else {
          await loadCertifications();
        }
      } else {
        const created = await profileService.createCertification(payload);
        const createdItem = normalizeCertificationItem(created);

        if (createdItem) {
          setCertifications((prev) => [...prev, createdItem]);
        } else {
          await loadCertifications();
        }
      }

      closeCertificationForm();
    } catch {
      setCertificationsError(editingCertification ? 'Failed to update certification.' : 'Failed to add certification.');
    } finally {
      setSavingCertification(false);
    }
  };

  const deleteCertification = async (certification) => {
    const certificationId = getCertificationId(certification);
    if (!certificationId) {
      setCertificationsError('Unable to delete this certification.');
      return;
    }

    if (!confirm('Are you sure you want to delete this certification?')) return;

    try {
      setDeletingCertificationId(certificationId);
      setCertificationsError(null);
      await profileService.deleteCertification(certificationId);
      setCertifications((prev) => prev.filter((item) => getCertificationId(item) !== certificationId));

      if (getCertificationId(editingCertification) === certificationId) {
        closeCertificationForm();
      }
    } catch {
      setCertificationsError('Failed to delete certification.');
    } finally {
      setDeletingCertificationId(null);
    }
  };

  return (
    <>
      <div className="profile-card">
        <h2 className="card-title">Quick Actions</h2>
        <div className="quick-actions">
          <button type="button" className="action-item" onClick={handleDownloadCV} disabled={downloadingCV}>
            <DownloadIcon />
            {downloadingCV ? 'Downloading CV...' : 'Download CV'}
          </button>
          <button type="button" className="action-item" onClick={openEmailPreferencesModal}>
            <EmailIcon />
            Email Preferences
          </button>
          <button type="button" className="action-item" onClick={openCertificationsModal}>
            <CalendarIcon />
            Certifications
          </button>
        </div>
        {quickActionError && <p className="quick-actions-error">{quickActionError}</p>}
      </div>

      {isEmailModalOpen && (
        <ProfileModal title="Email Preferences" onClose={closeEmailPreferencesModal}>
          {loadingEmailPreferences ? (
            <p className="quick-actions-loading">Loading email preferences...</p>
          ) : (
            <form className="profile-modal-form" onSubmit={saveEmailPreferences}>
              <label className="profile-checkbox-label">
                <input
                  type="checkbox"
                  name="jobAlerts"
                  checked={emailPreferences.jobAlerts}
                  onChange={changeEmailPreference}
                />
                Job Alerts
              </label>

              <label className="profile-checkbox-label">
                <input
                  type="checkbox"
                  name="weeklyDigest"
                  checked={emailPreferences.weeklyDigest}
                  onChange={changeEmailPreference}
                />
                Weekly Digest
              </label>

              <label className="profile-checkbox-label">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={emailPreferences.marketingEmails}
                  onChange={changeEmailPreference}
                />
                Marketing Emails
              </label>

              <label className="profile-checkbox-label">
                <input
                  type="checkbox"
                  name="securityAlerts"
                  checked={emailPreferences.securityAlerts}
                  onChange={changeEmailPreference}
                />
                Security Alerts
              </label>

              {emailPreferencesError && <p className="profile-form-error">{emailPreferencesError}</p>}

              <div className="profile-modal-actions">
                <button type="button" className="profile-btn-cancel" onClick={closeEmailPreferencesModal} disabled={savingEmailPreferences}>
                  Cancel
                </button>
                <button type="submit" className="profile-btn-save" disabled={savingEmailPreferences}>
                  {savingEmailPreferences ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>
          )}
        </ProfileModal>
      )}

      {isCertificationsModalOpen && (
        <ProfileModal title="Certifications" onClose={closeCertificationsModal}>
          {loadingCertifications ? (
            <p className="quick-actions-loading">Loading certifications...</p>
          ) : (
            <>
              <div className="certifications-toolbar">
                {!isCertificationFormOpen && (
                  <button type="button" className="profile-btn-save quick-actions-inline-btn" onClick={openAddCertificationForm}>
                    Add Certification
                  </button>
                )}
              </div>

              {certificationsError && <p className="profile-form-error">{certificationsError}</p>}

              {certifications.length > 0 ? (
                <div className="certifications-list">
                  {certifications.map((cert, index) => {
                    const certId = getCertificationId(cert);
                    const key = certId ?? `cert-${index}`;
                    const isDeleting = deletingCertificationId === certId;
                    return (
                      <div key={key} className="certification-item">
                        <div className="certification-main">
                          <h3 className="certification-name">{cert.name || 'Certification'}</h3>
                          <p className="certification-org">{cert.issuingOrganization || ''}</p>
                          <p className="certification-meta">
                            Issued: {formatDateDisplay(cert.issueDate) || 'N/A'}
                            {cert.expiryDate ? ` | Expires: ${formatDateDisplay(cert.expiryDate)}` : ' | No expiry'}
                          </p>
                          {cert.credentialID && <p className="certification-meta">Credential ID: {cert.credentialID}</p>}
                          {cert.credentialURL && (
                            <a className="certification-link" href={cert.credentialURL} target="_blank" rel="noreferrer">
                              Verify Credential
                            </a>
                          )}
                        </div>
                        <div className="certification-actions">
                          <button
                            type="button"
                            className="certification-action-btn"
                            onClick={() => openEditCertificationForm(cert)}
                            title="Edit certification"
                          >
                            <EditIcon />
                          </button>
                          <button
                            type="button"
                            className="certification-action-btn certification-delete-btn"
                            onClick={() => deleteCertification(cert)}
                            disabled={isDeleting}
                            title="Delete certification"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="section-empty">No certifications added yet.</p>
              )}

              {isCertificationFormOpen && (
                <form className="profile-modal-form quick-certification-form" onSubmit={saveCertification}>
                  <div className="profile-form-group">
                    <label htmlFor="certName">Certification Name</label>
                    <input
                      id="certName"
                      name="name"
                      type="text"
                      value={certificationForm.name}
                      onChange={changeCertificationForm}
                      placeholder="e.g. Azure Fundamentals"
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="certOrg">Issuing Organization</label>
                    <input
                      id="certOrg"
                      name="issuingOrganization"
                      type="text"
                      value={certificationForm.issuingOrganization}
                      onChange={changeCertificationForm}
                      placeholder="e.g. Microsoft"
                      required
                    />
                  </div>

                  <div className="quick-actions-two-col">
                    <div className="profile-form-group">
                      <label htmlFor="certIssueDate">Issue Date</label>
                      <input
                        id="certIssueDate"
                        name="issueDate"
                        type="date"
                        value={certificationForm.issueDate}
                        onChange={changeCertificationForm}
                        required
                      />
                    </div>

                    <div className="profile-form-group">
                      <label htmlFor="certExpiryDate">Expiry Date (optional)</label>
                      <input
                        id="certExpiryDate"
                        name="expiryDate"
                        type="date"
                        value={certificationForm.expiryDate}
                        onChange={changeCertificationForm}
                      />
                    </div>
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="certCredentialId">Credential ID</label>
                    <input
                      id="certCredentialId"
                      name="credentialID"
                      type="text"
                      value={certificationForm.credentialID}
                      onChange={changeCertificationForm}
                      placeholder="e.g. ABC123"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="certCredentialUrl">Credential URL</label>
                    <input
                      id="certCredentialUrl"
                      name="credentialURL"
                      type="url"
                      value={certificationForm.credentialURL}
                      onChange={changeCertificationForm}
                      placeholder="https://example.com/verify"
                    />
                  </div>

                  <div className="profile-modal-actions">
                    <button type="button" className="profile-btn-cancel" onClick={closeCertificationForm} disabled={savingCertification}>
                      Cancel
                    </button>
                    <button type="submit" className="profile-btn-save" disabled={savingCertification}>
                      {savingCertification ? 'Saving...' : editingCertification ? 'Update Certification' : 'Add Certification'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </ProfileModal>
      )}
    </>
  );
};

export default QuickActions;
