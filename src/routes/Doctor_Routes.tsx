import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import DoctorSignUp from "../pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "../pages/Doctor/DoctorOtpVerification";
import ProfessionalDetailsForm from "../pages/Doctor/RegisterAsADoctorPage";
import DoctorLoginPage from "../pages/Doctor/DoctorLoginPage";
import DoctorDashboardPage from "../pages/Doctor/DoctorDashboardPage";
import RequireAuth from "../components/RequiredAuth";
import { Roles } from "@/utils/Enums";
import DoctorMainLayout from "@/components/Doctor/DoctorMainLayout";
import DoctorForgotPasswordPage from "@/pages/Doctor/DoctorForgotPassword";
import DoctorForgotPasswordOTPPage from "@/pages/Doctor/DoctorForgotPasswordOTPPage";
import SetNewPasswordPage from "@/pages/Doctor/SetNewPassword";
import DoctorProflePage from "@/pages/Doctor/DoctorProflePage";
import MeetingPage from "@/pages/Doctor/ConsultationMeetingPage";
import ConsultationPage from "@/pages/Doctor/ConsultationPage";
import NotificationPage from "@/pages/Users/NotificationsPage";
import ChatPage from "@/pages/Test/ChatPage";
import AppointmentPage from "@/pages/Users/AppointmentPage";
import TransactionsPage from "@/pages/Users/TransactionPage";
import WalletPage from "@/pages/Users/WalletPage";
import GoogleOAuthWrapper from "./GoogleOAuthWrapper";
import PublicRoute from "./PublicRoute";
const Doctor_Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<GoogleOAuthWrapper><DoctorSignUp /></GoogleOAuthWrapper>} />
        <Route path="/verify/otp" element={<DoctorOtpVerification />} />
        <Route path="/registration" element={<ProfessionalDetailsForm />} />
        <Route path="/login" element={<GoogleOAuthWrapper><DoctorLoginPage /></GoogleOAuthWrapper>} />
        <Route path="/forgot-password" element={<DoctorForgotPasswordPage />} />
        <Route path="/verify-reset-otp" element={<DoctorForgotPasswordOTPPage />} />
        <Route path="/reset/new-password" element={<SetNewPasswordPage />} />
      </Route>
        {/*Protected Routes*/}
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
  );
};

export default Doctor_Routes;
