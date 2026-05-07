import Footer from '../../../components/layout/Footer';
import Navbar from '../../../components/layout/Navbar';
import ApplicationStatusCard from './ApplicationStatusCard';
import DashboardBottomGrid from './DashboardBottomGrid';
import KpiGrid from './KpiGrid';
import MonthlyTrendsCard from './MonthlyTrendsCard';
import SkillProgressCard from './SkillProgressCard';
import {
  kpiCards,
  monthlyLabels,
  monthlySeries,
  recommendations,
  skillRows,
} from './dashboardData';

const DashboardView = () => (
  <div className="dashboard-screen">
    <Navbar />

    <main className="dashboard-main">
      <section className="dashboard-header">
        <h1>Progress Dashboard</h1>
        <p>Track your career development journey with detailed analytics</p>
      </section>

      <KpiGrid cards={kpiCards} />
      <SkillProgressCard skills={skillRows} />
      <ApplicationStatusCard />
      <MonthlyTrendsCard
        monthlySeries={monthlySeries}
        monthlyLabels={monthlyLabels}
      />
      <DashboardBottomGrid recommendations={recommendations} />
    </main>

    <Footer />
  </div>
);

export default DashboardView;
