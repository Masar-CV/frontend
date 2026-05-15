import { useEffect, useMemo, useState } from 'react';
import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';
import jobApplicationService, {
  JOB_APPLICATION_STATUS,
  JOB_APPLICATION_STATUS_LABELS,
} from '../../../services/jobApplicationService';
import AddJobModal from './AddJobModal';
import ApplicationsTable from './ApplicationsTable';
import JobTrackerHero from './JobTrackerHero';
import RecentApplications from './RecentApplications';
import SummaryStats from './SummaryStats';

const getTodayInputValue = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const today = getTodayInputValue();

const emptyForm = {
  companyName: '',
  position: '',
  location: '',
  salaryRange: '',
  contactName: '',
  status: String(JOB_APPLICATION_STATUS.WISHLIST),
  notes: '',
  appliedDate: today,
};

const statusTones = {
  [JOB_APPLICATION_STATUS.WISHLIST]: 'wishlist',
  [JOB_APPLICATION_STATUS.APPLIED]: 'applied',
  [JOB_APPLICATION_STATUS.INTERVIEW]: 'interview',
  [JOB_APPLICATION_STATUS.OFFER]: 'offer',
  [JOB_APPLICATION_STATUS.REJECTED]: 'rejected',
};

const formatDate = (value) => {
  if (!value) return '';

  return new Intl.DateTimeFormat('en-US').format(new Date(value));
};

const toDateInputValue = (value) => {
  if (!value) return today;

  return new Date(value).toISOString().slice(0, 10);
};

const toIsoDate = (dateValue) => new Date(`${dateValue}T00:00:00.000Z`).toISOString();

const mapApplication = (application) => {
  const status = Number(application.status);
  const appliedDate = application.dateApplied || application.appliedDate;

  return {
    id: application.id,
    company: application.companyName,
    companyName: application.companyName,
    position: application.position,
    status: JOB_APPLICATION_STATUS_LABELS[status] || 'Wishlist',
    statusValue: String(status),
    statusTone: statusTones[status] || 'wishlist',
    dateApplied: formatDate(appliedDate),
    appliedDateInput: toDateInputValue(appliedDate),
    salary: application.salaryRange,
    salaryRange: application.salaryRange,
    location: application.location,
    contact: application.contactName,
    contactName: application.contactName,
    notes: application.notes,
  };
};

const buildSummaryStats = (applications) => (
  [
    {
      label: 'Wishlist',
      value: applications.filter((app) => app.statusTone === 'wishlist').length,
      tone: 'wishlist',
    },
    {
      label: 'Applied',
      value: applications.filter((app) => app.statusTone === 'applied').length,
      tone: 'applied',
    },
    {
      label: 'Interview',
      value: applications.filter((app) => app.statusTone === 'interview').length,
      tone: 'interview',
    },
    {
      label: 'Offer',
      value: applications.filter((app) => app.statusTone === 'offer').length,
      tone: 'offer',
    },
  ]
);

const mapSummaryStats = (summary = {}) => [
  { label: 'Wishlist', value: summary.wishlist || 0, tone: 'wishlist' },
  { label: 'Applied', value: summary.applied || 0, tone: 'applied' },
  { label: 'Interview', value: summary.interview || 0, tone: 'interview' },
  { label: 'Offer', value: summary.offer || 0, tone: 'offer' },
];

const incrementSummaryStats = (stats, tone) => (
  stats.map((stat) => (
    stat.tone === tone
      ? { ...stat, value: stat.value + 1 }
      : stat
  ))
);

const decrementSummaryStats = (stats, tone) => (
  stats.map((stat) => (
    stat.tone === tone
      ? { ...stat, value: Math.max(stat.value - 1, 0) }
      : stat
  ))
);

const adjustSummaryStats = (stats, previousTone, nextTone) => (
  stats.map((stat) => {
    if (stat.tone === previousTone && previousTone !== nextTone) {
      return { ...stat, value: Math.max(stat.value - 1, 0) };
    }

    if (stat.tone === nextTone && previousTone !== nextTone) {
      return { ...stat, value: stat.value + 1 };
    }

    return stat;
  })
);

const toFormData = (application) => ({
  companyName: application.companyName || '',
  position: application.position || '',
  location: application.location || '',
  salaryRange: application.salaryRange || '',
  contactName: application.contactName || '',
  status: application.statusValue || String(JOB_APPLICATION_STATUS.WISHLIST),
  notes: application.notes || '',
  appliedDate: application.appliedDateInput || today,
});

const replaceApplicationById = (applications, nextApplication) => (
  applications.map((application) => (
    application.id === nextApplication.id ? nextApplication : application
  ))
);

const JobTrackerView = () => {
  const [applications, setApplications] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [summaryStats, setSummaryStats] = useState(mapSummaryStats());
  const [formData, setFormData] = useState(emptyForm);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingApplicationId, setDeletingApplicationId] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const pageSummaryStats = useMemo(() => buildSummaryStats(applications), [applications]);

  useEffect(() => {
    let isActive = true;

    const loadApplications = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const [listData, recentData, summaryData] = await Promise.all([
          jobApplicationService.list({
            page: 1,
            pageSize: 20,
            sort: 'datecreated',
            sortDir: 'desc',
          }),
          jobApplicationService.recent({ take: 10 }),
          jobApplicationService.summary(),
        ]);

        if (isActive) {
          const mappedApplications = (listData.items || []).map(mapApplication);
          const mappedRecentApplications = (recentData || []).map(mapApplication);

          setApplications(mappedApplications);
          setRecentApplications(mappedRecentApplications);
          setSummaryStats(summaryData ? mapSummaryStats(summaryData) : buildSummaryStats(mappedApplications));
        }
      } catch (error) {
        if (isActive) {
          setLoadError(error.message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadApplications();

    return () => {
      isActive = false;
    };
  }, []);

  const handleOpenModal = () => {
    setEditingApplication(null);
    setFormData(emptyForm);
    setActionError('');
    setSubmitError('');
    setIsModalOpen(true);
  };

  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setFormData(toFormData(application));
    setActionError('');
    setSubmitError('');
    setIsModalOpen(true);
  };

  const handleDeleteApplication = async (application) => {
    const shouldDelete = window.confirm(`Delete ${application.company}?`);

    if (!shouldDelete) return;

    setDeletingApplicationId(application.id);
    setActionError('');

    try {
      await jobApplicationService.delete(application.id);

      setApplications((current) => current.filter((item) => item.id !== application.id));
      setRecentApplications((current) => current.filter((item) => item.id !== application.id));
      setSummaryStats((current) => decrementSummaryStats(current, application.statusTone));
    } catch (error) {
      setActionError(error.message);
    } finally {
      setDeletingApplicationId(null);
    }
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setEditingApplication(null);
    setSubmitError('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        ...formData,
        appliedDate: toIsoDate(formData.appliedDate),
      };

      if (editingApplication) {
        const updatedApplication = await jobApplicationService.update(editingApplication.id, payload);
        const mappedApplication = mapApplication(updatedApplication);

        setApplications((current) => replaceApplicationById(current, mappedApplication));
        setRecentApplications((current) => replaceApplicationById(current, mappedApplication));
        setSummaryStats((current) => (
          adjustSummaryStats(current, editingApplication.statusTone, mappedApplication.statusTone)
        ));
        setFormData(emptyForm);
        setEditingApplication(null);
        setIsModalOpen(false);
        return;
      }

      const createdApplication = await jobApplicationService.create(payload);
      const mappedApplication = mapApplication(createdApplication);

      setApplications((current) => [mappedApplication, ...current]);
      setRecentApplications((current) => [mappedApplication, ...current].slice(0, 10));
      setSummaryStats((current) => (
        current.length > 0
          ? incrementSummaryStats(current, mappedApplication.statusTone)
          : incrementSummaryStats(pageSummaryStats, mappedApplication.statusTone)
      ));
      setFormData(emptyForm);
      setIsModalOpen(false);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-tracker-screen">
      <Navbar />

      <main className="job-tracker-main">
        <JobTrackerHero onAddJob={handleOpenModal} />
        <SummaryStats stats={summaryStats} />

        {isLoading && (
          <p className="job-tracker-state" role="status">
            Loading job applications...
          </p>
        )}

        {!isLoading && loadError && (
          <p className="job-tracker-state error" role="alert">
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && actionError && (
          <p className="job-tracker-state error" role="alert">
            {actionError}
          </p>
        )}

        {!isLoading && !loadError && applications.length === 0 && recentApplications.length === 0 && (
          <p className="job-tracker-state">
            No job applications yet.
          </p>
        )}

        {!isLoading && !loadError && (applications.length > 0 || recentApplications.length > 0) && (
          <>
            <RecentApplications applications={recentApplications} />
            <ApplicationsTable
              applications={applications}
              deletingApplicationId={deletingApplicationId}
              onDeleteApplication={handleDeleteApplication}
              onEditApplication={handleEditApplication}
            />
          </>
        )}
      </main>

      {isModalOpen && (
        <AddJobModal
          formData={formData}
          isEditing={Boolean(editingApplication)}
          isSubmitting={isSubmitting}
          error={submitError}
          onChange={handleFormChange}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}

      <Footer />
    </div>
  );
};

export default JobTrackerView;
