import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import CVAnalysis from './pages/cv-analysis/CVAnalysis';
import CVOptimizationPage from './pages/cv-optimization/CVOptimizationPage';
import CVOptimizationResultsPage from './pages/cv-optimization/CVOptimizationResultsPage';
import MockInterview from './pages/mock-interview/MockInterview';
import JobTracker from './pages/job-tracker/JobTracker';
import Resources from './pages/resources/Resources';
import TemplateEditor from './pages/resources/TemplateEditor';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page - First Screen */}
        <Route path="/" element={<Home />} />

        {/* Public Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cv-optimization" element={<CVOptimizationPage />} />
        <Route path="/cv-optimization/results" element={<CVOptimizationResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/resources" element={<Resources />} />
        <Route path="/dashboard/resources/editor/:templateId" element={<TemplateEditor />} />
        <Route path="/dashboard/cv-analysis" element={<CVAnalysis />} />
        <Route path="/dashboard/job-tracker" element={<JobTracker />} />
        <Route path="/dashboard/mock-interview" element={<MockInterview />} />
        
        {/* 404 - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
