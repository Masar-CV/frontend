import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../app/routes/paths';
import tokenManager from '../utils/tokenManager';

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
  const location = useLocation();
  const isAuthenticated = tokenManager.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
