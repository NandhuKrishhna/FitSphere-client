import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import DoctorSignUp from "../pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "../pages/Doctor/DoctorOtpVerification";
import ProfessionalDetailsForm from "../pages/Doctor/RegisterAsADoctorPage";
import DoctorLoginPage from "../pages/Doctor/DoctorLoginPage";
import DoctorDashboardPage from "../pages/Doctor/DoctorDashboardPage";
import AppointmentTable from "../pages/Doctor/AppointmentManagmentPage";
import RequireAuth from "../components/RequiredAuth";
import DoctorChatPage from "@/pages/Doctor/DoctorChatPage";
import { Roles } from "@/utils/Enums";
import DoctorMainLayout from "@/components/Doctor/DoctorMainLayout";
import DoctorForgotPasswordPage from "@/pages/Doctor/DoctorForgotPassword";
import DoctorForgotPasswordOTPPage from "@/pages/Doctor/DoctorForgotPasswordOTPPage";
import SetNewPasswordPage from "@/pages/Doctor/SetNewPassword";
import DoctorProflePage from "@/pages/Doctor/DoctorProflePage";
import MeetingPage from "@/pages/Doctor/ConsultationMeetingPage";
import ConsultationPage from "@/pages/Doctor/ConsultationPage";

const Doctor_Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/signup" element={<DoctorSignUp />} />
        <Route path="/verify/otp" element={<DoctorOtpVerification />} />
        <Route path="/registration" element={<ProfessionalDetailsForm />} />
        <Route path="/login" element={<DoctorLoginPage />} />
        <Route path="/forgot-password" element={<DoctorForgotPasswordPage />} />
        <Route path="/verify-reset-otp" element={<DoctorForgotPasswordOTPPage />} />
        <Route path="/reset/new-password" element={<SetNewPasswordPage />} />
        <Route path="/profile" element={<DoctorProflePage />} />
        {/*Protected Routes*/}
        <Route element={<RequireAuth allowedRoles={[Roles.DOCTOR]} redirectTo={"/doctor/login"} />}>
          <Route element={<DoctorMainLayout />}>
            <Route path="/dashboard" element={<DoctorDashboardPage />} />
            <Route path="/appointments" element={<AppointmentTable />} />
            <Route path="/chat" element={<DoctorChatPage />} />
            <Route path="/create-meet" element={<MeetingPage />} />
            <Route path="/consultation/:meetId" element={<ConsultationPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Doctor_Routes;
