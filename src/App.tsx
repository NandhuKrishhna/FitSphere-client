import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordOtp from "./pages/ResetPasswordOtp";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const isSignedIn = useSelector((state : RootState) => state.auth.isSignIn);
  const isOtpVerified = useSelector((state : RootState) => state.auth.isOtpVerified);
  return isLandingPage ? (
    <Routes>
      <Route path="/" element={isSignedIn ? <Navigate to="/home" replace /> : <LandingPage />} />
    </Routes>
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-500 to-black text-gray-500 
      flex items-center justify-center relative overflow-hidden"
    >
      <Routes>
         {/* sign -> otpverfication -> home 
       login -> forgotpassword -> otp -> resetpassword
      */}
      <Route path="/signup" element={isSignedIn ? <Navigate to="/home" replace /> : <SignUpPage />} />
        <Route path="/verify-email" element={isSignedIn ? <Navigate to="/home" replace /> : <VerifyOtpPage />} />

        <Route path="/login" element={isSignedIn ? <Navigate to="/home" replace /> : <LoginPage />}  />
        <Route path="/forgot-password" element={isSignedIn ? <Navigate to="/home" replace /> : <ForgotPasswordPage />}  />
        <Route path="/verify-reset-otp" element={isSignedIn ? <Navigate to="/home" replace /> : <ResetPasswordOtp />}  />
        <Route path="/reset/new-password" element={isOtpVerified ? <ResetPasswordPage /> : <Navigate to="/login" replace />} />

        <Route path="/home" element={isSignedIn? <HomePage/> : <Navigate to="/login" /> } />
        
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
