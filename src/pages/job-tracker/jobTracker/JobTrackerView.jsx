import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';
import ApplicationsTable from './ApplicationsTable';
import JobTrackerHero from './JobTrackerHero';
import RecentApplications from './RecentApplications';
import SummaryStats from './SummaryStats';
import { applications, summaryStats } from './jobTrackerData';

const JobTrackerView = () => (
  <div className="job-tracker-screen">
    <Navbar />

    <main className="job-tracker-main">
      <JobTrackerHero />
      <SummaryStats stats={summaryStats} />
      <RecentApplications applications={applications} />
      <ApplicationsTable applications={applications} />
    </main>

    <Footer />
  </div>
);

export default JobTrackerView;
