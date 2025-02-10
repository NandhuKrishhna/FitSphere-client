import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import SignupForm from "../pages/Users/SignUpPage";
import OTPVerificationPage from "../pages/Users/VerifyOtpPage";
import LoginPage from "../pages/Users/LoginPage";
import ForgotPasswordPage from "../pages/Users/ForgotPasswordPage";
import ResetPasswordOtp from "../pages/Users/ResetPasswordOtp";
import ResetPasswordPage from "../pages/Users/ResetPasswordPage";
import LandingPage from "../pages/Users/LandingPage";
import HomePage from "../pages/Users/HomePage";
import { RootState } from "../redux/store";
import DoctorsPage from "../pages/Users/DoctorsPage";
import ProtectedRoute from "./ProtectedRoutes";
import UserProfilePage from "../pages/Users/UserProfilePage";


const UserRoutes = () => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignIn);
  const isOtpVerified = useSelector((state: RootState) => state.auth.isOtpVerified);

  return (
    <>
      <Route path="/signup" element={isSignedIn ? <Navigate to="/home" replace /> : <div className="min-h-screen bg-gradient-to-br from-gray-500 to-black text-gray-500 flex items-center justify-center relative overflow-hidden"><SignupForm /></div>} />
      <Route path="/verify-email" element={isSignedIn ? <Navigate to="/home" replace /> : <OTPVerificationPage />} />
      <Route path="/login" element={isSignedIn ? <Navigate to="/home" replace /> : <LoginPage />} />
      <Route path="/forgot-password" element={isSignedIn ? <Navigate to="/home" replace /> : <ForgotPasswordPage />} />
      <Route path="/verify-reset-otp" element={isSignedIn ? <Navigate to="/home" replace /> : <ResetPasswordOtp/>} />
      <Route path="/reset/new-password" element={isOtpVerified ? <ResetPasswordPage /> : <Navigate to="/login" replace />} />
      <Route path="/" element={isSignedIn ? <Navigate to="/home" replace /> : <LandingPage />} />
      <Route path="/home" element={isSignedIn ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/home" element={isSignedIn ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/doctors/all" element={isSignedIn ? <DoctorsPage /> : <Navigate to="/login" />} />
      <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
       <Route path="/profile" element={<UserProfilePage/>}/>


      </Route>
    </>
  );
};

export default UserRoutes;