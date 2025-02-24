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
  console.log(token);
  console.log(authUser);

  return token ? (
    allowedRoles.includes(authUser?.role ?? "") ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};

export default RequireAuth;
