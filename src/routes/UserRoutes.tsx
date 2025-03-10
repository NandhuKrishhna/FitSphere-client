import { Route, Routes } from "react-router-dom";
import SignupForm from "../pages/Users/SignUpPage";
import OTPVerificationPage from "../pages/Users/VerifyOtpPage";
import LoginPage from "../pages/Users/LoginPage";
import ForgotPasswordPage from "../pages/Users/ForgotPasswordPage";
import ResetPasswordOtp from "../pages/Users/ResetPasswordOtp";
import ResetPasswordPage from "../pages/Users/ResetPasswordPage";
import DoctorsPage from "../pages/Users/DoctorsPage";
import UserProfilePage from "../pages/Users/UserProfilePage";
import DoctorDetailsPage from "../pages/Users/DoctorDetailsPage";
import WalletPage from "../pages/Users/WalletPage";
import RequireAuth from "../components/RequiredAuth";
import Layout from "../components/Layout";
import ChatPage from "@/pages/Users/ChatPage";
import { Roles } from "@/utils/Enums";
import RecipesGeneratorPage from "@/pages/Users/RecipesPage";
import AppointmentPage from "@/pages/Users/AppointmentPage";
import MeetingPage from "@/pages/Doctor/ConsultationMeetingPage";
import ConsultationPage from "@/pages/Doctor/ConsultationPage";
import AgeSelector from "@/pages/Users/EnterAgePage";
import AgeGenderSelector from "@/pages/Users/GenderSelector";
import ActivityLevelSelectionPage from "@/pages/Users/ActivityLevel";
import CurrentWeightSelection from "@/pages/Users/CurrentWeightSelector";
import TargetWeightSelectionPage from "@/pages/Users/TargetWeight";
import WeekSelectionPage from "@/pages/Users/WeeksToGoalSelectionPage";
import HeightSelector from "@/pages/Users/HeightSelector";
import HomePage from "@/pages/Users/HomePage";
import SubscriptionPage from "@/pages/Users/PremiumPricingPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-email" element={<OTPVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset-otp" element={<ResetPasswordOtp />} />
        <Route path="/reset/new-password" element={<ResetPasswordPage />} />
        {/* 
         // TODO : move these routes to protected;
        */}
        <Route path="/age" element={<AgeSelector />} />
        <Route path="/gender" element={<AgeGenderSelector />} />
        <Route path="/height" element={<HeightSelector />} />
        <Route path="/current-weight" element={<CurrentWeightSelection />} />
        <Route path="/target-weight" element={<TargetWeightSelectionPage />} />
        <Route path="/activity-level" element={<ActivityLevelSelectionPage />} />
        <Route path="/select-week" element={<WeekSelectionPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />

        <Route element={<RequireAuth allowedRoles={[Roles.USER]} redirectTo="/login" />}>
          <Route path="/doctors/all" element={<DoctorsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/doctors/profile" element={<DoctorDetailsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path="/recipes" element={<RecipesGeneratorPage />} />
          <Route path="/create-meet" element={<MeetingPage />} />
          <Route path="/consultation/:meetId" element={<ConsultationPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
