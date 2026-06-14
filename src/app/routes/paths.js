const DASHBOARD_ROOT = '/dashboard';
const RESOURCES_ROOT = `${DASHBOARD_ROOT}/resources`;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  profile: '/profile',
  cvOptimization: '/cv-optimization',
  cvOptimizationResults: '/cv-optimization/results',
  dashboard: DASHBOARD_ROOT,
  dashboardResources: RESOURCES_ROOT,
  dashboardResourceEditor: (templateId = ':templateId') =>
    `${RESOURCES_ROOT}/editor/${templateId}`,
  dashboardCvAnalysis: `${DASHBOARD_ROOT}/cv-analysis`,
  dashboardJobTracker: `${DASHBOARD_ROOT}/job-tracker`,
  dashboardMockInterview: `${DASHBOARD_ROOT}/mock-interview`,
};

export const ROUTE_SEGMENTS = {
  login: 'login',
  register: 'register',
  forgotPassword: 'forgot-password',
  profile: 'profile',
  cvOptimization: 'cv-optimization',
  cvOptimizationResults: 'cv-optimization/results',
  dashboard: 'dashboard',
  dashboardResources: 'dashboard/resources',
  dashboardResourceEditor: 'dashboard/resources/editor/:templateId',
  dashboardCvAnalysis: 'dashboard/cv-analysis',
  dashboardJobTracker: 'dashboard/job-tracker',
  dashboardMockInterview: 'dashboard/mock-interview',
};
