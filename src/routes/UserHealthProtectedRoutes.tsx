import { Navigate, Outlet, useLocation } from "react-router-dom";


const allowedSignupRoutes = ["/age", "/gender", "/height", "/current-weight", "/target-weight", "/activity-level", "/select-week"];

const UserHealthProtectedRoute = () => {
  const location = useLocation();
  const signupInProgress = localStorage.getItem("signupInProgress");

  if (signupInProgress && !allowedSignupRoutes.includes(location.pathname)) {
    return <Navigate to="/age" replace />;
  }

  return <Outlet />;
};

export default UserHealthProtectedRoute;
