import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequiredAuth";
import Layout from "../components/Layout";
import { Roles } from "@/utils/Enums";
import PublicRoute from "./PublicRoute";
import GoogleOAuthWrapper from "./GoogleOAuthWrapper";

import UserHealthProtectedRoute from "./UserHealthProtectedRoutes";
import NotFound from "@/pages/Not-Found";
import { Loader } from "lucide-react";

const LoginPage = lazy(() => import("../pages/Users/LoginPage"));
const SignupForm = lazy(() => import("@/pages/Users/SignUpPage"));
const OTPVerificationPage = lazy(() => import("@/pages/Users/VerifyOtpPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/Users/ForgotPasswordPage"));
const ResetPasswordOtp = lazy(() => import("@/pages/Users/ResetPasswordOtp"));
const ResetPasswordPage = lazy(() => import("@/pages/Users/ResetPasswordPage"));

const DoctorsPage = lazy(() => import("../pages/Users/DoctorsPage"));
const UserProfilePage = lazy(() => import("../pages/Users/UserProfilePage"));
const DoctorDetailsPage = lazy(() => import("../pages/Users/DoctorDetailsPage"));
const WalletPage = lazy(() => import("../pages/Users/WalletPage"));
const AppointmentPage = lazy(() => import("@/pages/Users/AppointmentPage"));
const MeetingPage = lazy(() => import("@/pages/Doctor/ConsultationMeetingPage"));
const ConsultationPage = lazy(() => import("@/pages/Doctor/ConsultationPage"));
const SubscriptionPage = lazy(() => import("@/pages/Users/PremiumPricingPage"));
const NotificationPage = lazy(() => import("@/pages/Users/NotificationsPage"));
const TransactionPage = lazy(() => import("@/pages/Users/TransactionPage"));
const ChatPage = lazy(() => import("@/pages/Test/ChatPage"));
const HomePage = lazy(() => import("@/pages/Users/HomePage"));
const AgeSelector = lazy(() => import("@/pages/Users/EnterAgePage"));
const AgeGenderSelector = lazy(() => import("@/pages/Users/GenderSelector"));
const ActivityLevelSelectionPage = lazy(() => import("@/pages/Users/ActivityLevel"));
const CurrentWeightSelection = lazy(() => import("@/pages/Users/CurrentWeightSelector"));
const TargetWeightSelectionPage = lazy(() => import("@/pages/Users/TargetWeight"));
const WeekSelectionPage = lazy(() => import("@/pages/Users/WeeksToGoalSelectionPage"));
const HeightSelector = lazy(() => import("@/pages/Users/HeightSelector"));

const UserRoutes = () => {
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
            <Route path="/login" element={<GoogleOAuthWrapper><LoginPage /></GoogleOAuthWrapper>} />
            <Route path="/signup" element={<GoogleOAuthWrapper><SignupForm /></GoogleOAuthWrapper>} />
            <Route path="/verify-email" element={<OTPVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-reset-otp" element={<ResetPasswordOtp />} />
            <Route path="/reset/new-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.USER]} redirectTo="/login" />}>
            <Route element={<UserHealthProtectedRoute />}>
              <Route path="/age" element={<AgeSelector />} />
              <Route path="/gender" element={<AgeGenderSelector />} />
              <Route path="/height" element={<HeightSelector />} />
              <Route path="/current-weight" element={<CurrentWeightSelection />} />
              <Route path="/target-weight" element={<TargetWeightSelectionPage />} />
              <Route path="/activity-level" element={<ActivityLevelSelectionPage />} />
              <Route path="/select-week" element={<WeekSelectionPage />} />
            </Route>
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/doctors/all" element={<DoctorsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/doctors/details" element={<DoctorDetailsPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/create-meet" element={<MeetingPage />} />
            <Route path="/consultation/:meetId" element={<ConsultationPage />} />
            <Route path="/transactions" element={<TransactionPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
