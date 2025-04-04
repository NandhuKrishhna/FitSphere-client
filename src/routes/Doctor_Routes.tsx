import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import GoogleOAuthWrapper from "./GoogleOAuthWrapper";
import PublicRoute from "./PublicRoute";
import RequireAuth from "../components/RequiredAuth";
import { Roles } from "@/utils/Enums";
import DoctorMainLayout from "@/components/Doctor/DoctorMainLayout";
import NotFound from "@/pages/Not-Found";
import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";

const DoctorSignUp = lazy(() => import("../pages/Doctor/DoctorSignUp"));
const DoctorOtpVerification = lazy(() => import("../pages/Doctor/DoctorOtpVerification"));
const ProfessionalDetailsForm = lazy(() => import("../pages/Doctor/RegisterAsADoctorPage"));
const DoctorLoginPage = lazy(() => import("../pages/Doctor/DoctorLoginPage"));
const DoctorForgotPasswordPage = lazy(() => import("../pages/Doctor/DoctorForgotPassword"));
const DoctorForgotPasswordOTPPage = lazy(() => import("../pages/Doctor/DoctorForgotPasswordOTPPage"));
const SetNewPasswordPage = lazy(() => import("../pages/Doctor/SetNewPassword"));
const DoctorDashboardPage = lazy(() => import("../pages/Doctor/DoctorDashboardPage"));
const DoctorProflePage = lazy(() => import("../pages/Doctor/DoctorProflePage"));
const MeetingPage = lazy(() => import("../pages/Doctor/ConsultationMeetingPage"));
const ConsultationPage = lazy(() => import("../pages/Doctor/ConsultationPage"));
const NotificationPage = lazy(() => import("../pages/Users/NotificationsPage"));
const ChatPage = lazy(() => import("../pages/Test/ChatPage"));
const AppointmentPage = lazy(() => import("../pages/Users/AppointmentPage"));
const TransactionsPage = lazy(() => import("../pages/Users/TransactionPage"));
const WalletPage = lazy(() => import("../pages/Users/WalletPage"));

const Doctor_Routes = () => {
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
            <Route path="/signup" element={<GoogleOAuthWrapper><DoctorSignUp /></GoogleOAuthWrapper>} />
            <Route path="/verify/otp" element={<DoctorOtpVerification />} />
            <Route path="/registration" element={<ProfessionalDetailsForm />} />
            <Route path="/login" element={<GoogleOAuthWrapper><DoctorLoginPage /></GoogleOAuthWrapper>} />
            <Route path="/forgot-password" element={<DoctorForgotPasswordPage />} />
            <Route path="/verify-reset-otp" element={<DoctorForgotPasswordOTPPage />} />
            <Route path="/reset/new-password" element={<SetNewPasswordPage />} />
          </Route>
          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[Roles.DOCTOR]} redirectTo={"/doctor/login"} />}>
            <Route element={<DoctorMainLayout />}>
              <Route path="/dashboard" element={<DoctorDashboardPage />} />
              <Route path="/appointments" element={<AppointmentPage />} />
              <Route path="/create-meet" element={<MeetingPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/consultation/:meetId" element={<ConsultationPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/profile" element={<DoctorProflePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Doctor_Routes;