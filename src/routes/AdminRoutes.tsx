import { Navigate, Route, } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import UserManagementDashboard from "../pages/Admin/UserManagementPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NotificationPage from "../pages/Admin/NotificationPage";
import TUserManagement from "../pages/Admin/TUserManagement";
import DoctorManagement from "../pages/Admin/DoctorManagementPage";




const AdminRoutes = () => {
  const isAdmin = useSelector((state: RootState) => state.admin.admin);

  return (
    <>
      <Route
        path="/admin/login"
        element={
          isAdmin ? (
            <Navigate to="/admin/users-management" replace />
          ) : (
              <AdminLoginPage />
            
          )
        }
      />
      <Route
        path="/admin/users-management"
        element={isAdmin ? <UserManagementDashboard /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/admin/doctors-management"
        element={isAdmin ? <DoctorManagement /> : <Navigate to="/admin/login" replace />}
      />
       <Route path="/admin/notifications" element={isAdmin ? <NotificationPage /> : <Navigate to="/admin/login" replace />} />
       <Route path="/testUser" element={<TUserManagement />} />
       {/* <Route path="/test" element={</>} /> */}
    </>
  );
};
  
  export default AdminRoutes;
  