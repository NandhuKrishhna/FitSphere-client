import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import RequireAuth from "../components/RequiredAuth";
import UserManagementDashboard from "../pages/Admin/UserManagementPage";
import DoctorManagement from "../pages/Admin/DoctorManagementPage";
import NotificationPage from "../pages/Admin/NotificationPage";
import Layout from "@/components/Layout";
import { Roles } from "@/utils/Enums";

const Admin_Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} redirectTo="/admin/login" />}>
          <Route path="/users-management" element={<UserManagementDashboard />} />
          <Route path="/doctors-management" element={<DoctorManagement />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Admin_Routes;
