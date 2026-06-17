import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import AboutPage from '../../pages/company/AboutPage';
import ContactPage from '../../pages/company/ContactPage';
import PrivacyPage from '../../pages/company/PrivacyPage';
import TermsPage from '../../pages/company/TermsPage';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import Dashboard from '../../pages/dashboard/Dashboard';
import CVAnalysis from '../../pages/cv-analysis/CVAnalysis';
import CVOptimizationPage from '../../pages/cv-optimization/CVOptimizationPage';
import CVOptimizationResultsPage from '../../pages/cv-optimization/CVOptimizationResultsPage';
import MockInterview from '../../pages/mock-interview/MockInterview';
import JobTracker from '../../pages/job-tracker/JobTracker';
import Resources from '../../pages/resources/Resources';
import TemplateEditor from '../../pages/resources/TemplateEditor';
import ProfilePage from '../../pages/profile/ProfilePage';
import NotFound from '../../pages/NotFound';
import ProtectedRoute from '../../components/ProtectedRoute';
import SiteLayout from '../../components/layout/SiteLayout';
import { ROUTE_SEGMENTS } from './paths';

const routeConfig = [
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ROUTE_SEGMENTS.about,
        element: <AboutPage />,
      },
      {
        path: ROUTE_SEGMENTS.contact,
        element: <ContactPage />,
      },
      {
        path: ROUTE_SEGMENTS.privacy,
        element: <PrivacyPage />,
      },
      {
        path: ROUTE_SEGMENTS.terms,
        element: <TermsPage />,
      },
      {
        path: ROUTE_SEGMENTS.cvOptimization,
        element: <CVOptimizationPage />,
      },
      {
        path: ROUTE_SEGMENTS.cvOptimizationResults,
        element: <CVOptimizationResultsPage />,
      },
    ],
  },
  {
    path: ROUTE_SEGMENTS.login,
    element: <Login />,
  },
  {
    path: ROUTE_SEGMENTS.register,
    element: <Register />,
  },
  {
    path: ROUTE_SEGMENTS.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SiteLayout />,
        children: [
          {
            path: ROUTE_SEGMENTS.profile,
            element: <ProfilePage />,
          },
          {
            path: ROUTE_SEGMENTS.dashboard,
            element: <Dashboard />,
          },
          {
            path: ROUTE_SEGMENTS.dashboardResources,
            element: <Resources />,
          },
          {
            path: ROUTE_SEGMENTS.dashboardResourceEditor,
            element: <TemplateEditor />,
          },
          {
            path: ROUTE_SEGMENTS.dashboardCvAnalysis,
            element: <CVAnalysis />,
          },
          {
            path: ROUTE_SEGMENTS.dashboardJobTracker,
            element: <JobTracker />,
          },
          {
            path: ROUTE_SEGMENTS.dashboardMockInterview,
            element: <MockInterview />,
          },
        ],
      },
    ],
  },
  {
    element: <SiteLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const AppRoutes = () => useRoutes(routeConfig);

const AppRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default AppRouter;
