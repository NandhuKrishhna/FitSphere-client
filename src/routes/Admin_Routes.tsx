import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequiredAuth";
import Layout from "@/components/Layout";
import { Roles } from "@/utils/Enums";
import PublicRoute from "./PublicRoute";
import NotFound from "@/pages/Not-Found";
import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";
const AdminLoginPage = lazy(() => import("../pages/Admin/AdminLoginPage"));
const UserManagementDashboard = lazy(() => import("../pages/Admin/UserManagementPage"));
const DoctorManagement = lazy(() => import("../pages/Admin/DoctorManagementPage"));
const NotificationPage = lazy(() => import("../pages/Admin/NotificationPage"));
const SubscriptionManagement = lazy(() => import("../pages/Admin/SubcriptionManagement"));
const AdminDashboard = lazy(() => import("../pages/Admin/Dashboard"));

const Admin_Routes = () => {
  return (
    <Suspense fallback={
      <div className="h-screen bg-black flex items-center justify-center">
        <Loader className="animate-spin text-gray-600 w-10 h-10" />
      </div>
    }>
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
    </Suspense>
  );
};

export default Admin_Routes;
