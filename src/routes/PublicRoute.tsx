import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = useSelector(selectCurrentUser)?.accessToken

  return token ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
