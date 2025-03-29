import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import RequireAuth from "../components/RequiredAuth";
import UserManagementDashboard from "../pages/Admin/UserManagementPage";
import DoctorManagement from "../pages/Admin/DoctorManagementPage";
import NotificationPage from "../pages/Admin/NotificationPage";
import Layout from "@/components/Layout";
import { Roles } from "@/utils/Enums";
import PublicRoute from "./PublicRoute";
import NotFound from "@/pages/Not-Found";
import SubscriptionManagement from "@/pages/Admin/SubcriptionManagement";
import AdminDashboard from "@/pages/Admin/Dashboard";

const Admin_Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route element={<PublicRoute />}>
          <Route path="login" element={<AdminLoginPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} redirectTo="/admin/login" />}>
          <Route path="/users-management" element={<UserManagementDashboard />} />
          <Route path="/doctors-management" element={<DoctorManagement />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/subscription-management" element={<SubscriptionManagement />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Admin_Routes;
