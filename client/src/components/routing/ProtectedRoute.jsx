import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check role-based access
  if (requiredRole) {
    if (requiredRole === 'admin' && user?.role !== 'admin') {
      return <Navigate to="/" />;
    }
    if (requiredRole === 'contributor' && user?.role !== 'contributor' && user?.role !== 'admin') {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;