import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

type ProtectedRouteProps = {
  allowedRoles: string[];
  redirectPath?: string;
};

type TokenPayload = {
  role: string;
  exp: number; 
};

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }: ProtectedRouteProps) => {
  // console.log(allowedRoles, redirectPath, "From Protected Route");
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  // console.log(user, accessToken, "From Protected Route");

  if (!accessToken || !user) {
    return <Navigate to={redirectPath} replace />;
  }

  let userRole = "";
  try {
    const decodedToken = jwtDecode<TokenPayload>(accessToken);
    // console.log(decodedToken, "Decoded Token from ProtectedRoute");

    const currentTime = Date.now() / 1000; 
    if (decodedToken.exp < currentTime) {
      toast.error("Access token expired. Logging out...");
      dispatch(logout()); 
      return <Navigate to={redirectPath} replace />;
    }

    userRole = decodedToken.role;
    console.log(userRole,"User role from ProtectedRoute");
  } catch (error : any) {
    console.log(error)
    toast.error("Invalid access token. Logging out...");
    dispatch(logout()); 
    return <Navigate to={redirectPath} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    dispatch(logout()); 
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
