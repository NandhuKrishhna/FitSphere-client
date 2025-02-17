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
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slice/Auth_Slice";
import TestPage from "../pages/TestPage";
import ChatPage from "@/pages/Users/ChatPage";
const USER_REDIRECT_PATH = "/login";

const UserRoutes = () => {
  const token = useSelector(selectCurrentToken);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-email" element={<OTPVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset-otp" element={<ResetPasswordOtp />} />
        <Route path="/reset/new-password" element={<ResetPasswordPage />} />
        <Route path="/test" element={<TestPage />} />

        <Route
          element={
            <RequireAuth token={token} redirectTo={USER_REDIRECT_PATH} />
          }
        >
          <Route path="/doctors/all" element={<DoctorsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/doctors/profile" element={<DoctorDetailsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/messenger" element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
