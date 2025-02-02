import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUpPage from "./pages/Users/SignUpPage";
import LoginPage from "./pages/Users/LoginPage";

import LandingPage from "./pages/Users/LandingPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Users/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import VerifyOtpPage from "./pages/Users/VerifyOtpPage";
import ForgotPasswordPage from "./pages/Users/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Users/ResetPasswordPage";
import ResetPasswordOtp from "./pages/Users/ResetPasswordOtp";
import DoctorRoutes from "./routes/DoctorRoutes";

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

        {DoctorRoutes()}
        <Route path="/home" element={isSignedIn? <HomePage/> : <Navigate to="/login" /> } />
        
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
