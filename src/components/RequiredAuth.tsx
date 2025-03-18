import { selectCurrentToken, selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type RequireAuthProps = {
  allowedRoles: string[];
  redirectTo: string;
};

const RequireAuth = ({ allowedRoles, redirectTo }: RequireAuthProps) => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  const authUser = useSelector(selectCurrentUser);
  const signupInProgress = localStorage.getItem("signupInProgress");

  if (signupInProgress && location.pathname === "/age") {
    return <Outlet />;
  }

  if (!token) {
    console.log("Redirecting to:", redirectTo);
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(authUser?.role ?? "")) {
    console.log("Redirecting to: /unauthorized");
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};



export default RequireAuth;
