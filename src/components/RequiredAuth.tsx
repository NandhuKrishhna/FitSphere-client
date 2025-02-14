import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../redux/slice/authSlice';


// interface AllowedRoles {
//   allowedRoles: string[];
//   redirectTo: string;
// }

const RequireAuth = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken)
  console.log("Token from RequireAuth : ",token)
  
  return(
    token 
    ? <Outlet/>
    : <Navigate to="/login" state={{ from: location }} replace />
  )
};

export default RequireAuth;