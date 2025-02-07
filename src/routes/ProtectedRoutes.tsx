import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {jwtDecode} from "jwt-decode";

type ProtectedRouteProps = {
  allowedRoles: string[];
  redirectPath?: string;
};

type TokenPayload = {
  role: string;
};

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }: ProtectedRouteProps) => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  if (!accessToken || !user) {
    return <Navigate to={redirectPath} replace />;
  }

  let userRole = "";
  try {
    const decodedToken = jwtDecode<TokenPayload>(accessToken);
    userRole = decodedToken.role;
  } catch (error) {
    console.error("Invalid access token:", error);
    return <Navigate to={redirectPath} replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
