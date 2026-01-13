import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import CVAnalysis from './pages/cv-analysis/CVAnalysis';
import MockInterview from './pages/mock-interview/MockInterview';
import JobTracker from './pages/job-tracker/JobTracker';
import Resources from './pages/resources/Resources';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes - With Layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cv-analysis" element={<CVAnalysis />} />
          <Route path="mock-interview" element={<MockInterview />} />
          <Route path="job-tracker" element={<JobTracker />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 404 - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
