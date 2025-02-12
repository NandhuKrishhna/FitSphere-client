import { Route } from "react-router-dom"
import AdminAuthentication from "./AdminRedirectAuthentication"
import AdminLoginPage from "../pages/Admin/AdminLoginPage"
import RequireAuth from "../components/RequiredAuth"
import UserManagementDashboard from "../pages/Admin/UserManagementPage"
import DoctorManagement from "../pages/Admin/DoctorManagementPage"
import NotificationPage from "../pages/Admin/NotificationPage"

const Admin_Routes = () => {
  return (
    <>
        <Route element={<AdminAuthentication redirectedTo="/admin/users-management"/>}>
        <Route path="login" element={<AdminLoginPage/>}/>
        </Route>
        <Route element ={<RequireAuth allowedRoles={["admin"]} redirectTo="/admin/login"/>}>
        <Route path="users-management" element={<UserManagementDashboard/>}/>
        <Route path="doctors-management" element={<DoctorManagement/>}/>
        <Route path="notifications" element={<NotificationPage/>}/>
        </Route>
    </>
  )
}

export default Admin_Routes
