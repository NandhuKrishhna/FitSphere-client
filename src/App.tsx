import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Users/LandingPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Users/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AdminRoutes from "./routes/AdminRoutes";
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
import DoctorSignUp from "./pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "./pages/Doctor/DoctorOtpVerification";
import ProfessionalDetailsForm from "./pages/Doctor/RegisterAsADoctorPage";
import SignupForm from "./pages/Users/SignUpPage";
import OTPVerificationPage from "./pages/Users/VerifyOtpPage";
import LoginPage from "./pages/Users/LoginPage";
import ForgotPasswordPage from "./pages/Users/ForgotPasswordPage";
import ResetPasswordOtp from "./pages/Users/ResetPasswordOtp";
import ResetPasswordPage from "./pages/Users/ResetPasswordPage";



function App() {
  const isSignedIn = useSelector((state : RootState) => state.auth.isSignIn);
  const isOtpVerified = useSelector((state : RootState) => state.auth.isOtpVerified);
  return (
     <div>
    <Routes>
    <Route path="/signup" element={isSignedIn ? <Navigate to="/home" replace /> : <SignupForm />} />
        <Route path="/verify-email" element={isSignedIn ? <Navigate to="/home" replace /> : <OTPVerificationPage />} />
        <Route path="/login" element={isSignedIn ? <Navigate to="/home" replace /> : <LoginPage />}  />
        <Route path="/forgot-password" element={isSignedIn ? <Navigate to="/home" replace /> : <ForgotPasswordPage />}  />
        <Route path="/verify-reset-otp" element={isSignedIn ? <Navigate to="/home" replace /> : <ResetPasswordOtp />}  />
        <Route path="/reset/new-password" element={isOtpVerified ? <ResetPasswordPage /> : <Navigate to="/login" replace />} />
      <Route path="/" element={isSignedIn ? <Navigate to="/home" replace /> : <LandingPage />} />
       <Route path="/*" element={<AdminRoutes/>}/>
      <Route path="/*"element={<div className="min-h-screen bg-gradient-to-br from-gray-500 to-black text-gray-500 flex items-center justify-center relative overflow-hidden"><AuthenticationRoutes /></div>} />
      <Route path="/home" element={isSignedIn? <HomePage/> : <Navigate to="/login" /> } />
      <Route path="/doctor/signup" element={<DoctorSignUp />} />
        <Route path="/doctor/verify/otp" element={<DoctorOtpVerification />} />
        <Route path="/doctor/registration" element={<ProfessionalDetailsForm />} />
        
      </Routes>
      <Toaster/>
      </div>
  );
}

export default App;
