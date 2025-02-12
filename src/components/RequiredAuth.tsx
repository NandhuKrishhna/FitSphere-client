import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AllowedRoles {
  allowedRoles: string[];
  redirectTo: string;
}

const RequireAuth = ({ allowedRoles, redirectTo }: AllowedRoles) => {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.admin.admin);

  // Only redirect if the user is not authenticated or their role is not allowed
  if (!token || user?.role !== allowedRoles[0]) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;