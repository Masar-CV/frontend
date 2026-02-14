import { Navigate } from 'react-router-dom';
import tokenManager from '../../utils/tokenManager';

/**
 * ProtectedRoute Component - Protects routes that require authentication
 * Redirects unauthenticated users to login page
 * 
 * Usage:
 * <Route 
 *   path="/dashboard" 
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   } 
 * />
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = tokenManager.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
