

import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface RedirectProps {
    redirectedTo: string;
}

const AdminAuthentication = ({ redirectedTo }: RedirectProps) => {
    const location = useLocation();
    const isAdminSignedIn = useSelector((state: RootState) => state.admin.isAdminLogin);
    const token = useSelector((state: RootState) => state.admin.accessToken);
  
    if (isAdminSignedIn && token) {
      return <Navigate to={redirectedTo} state={{ from: location }} replace />;
    }
  
    return <Outlet />;
  };
  
  export default AdminAuthentication;