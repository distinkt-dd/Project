import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '@features/auth/model/selectors';
import { useAppSelector } from '../hooks';

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
