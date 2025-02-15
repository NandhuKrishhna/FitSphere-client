import { Navigate, Outlet, useLocation } from 'react-router-dom';



// interface AllowedRoles {
//   allowedRoles: string[];
//   redirectTo: string;
// }
type Props ={
  token : string | undefined;
  redirectTo : string;
}
const RequireAuth = ({token, redirectTo}: Props) => {
  const location = useLocation();
  // console.log("Token from RequireAuth : ",token)
  
  return(
    token 
    ? <Outlet/>
    : <Navigate to={redirectTo} state={{ from: location }} replace />
  )
};

export default RequireAuth;