import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import VerifyOtpPage from "./pages/VerifyOtpPage";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const isSignedIn = useSelector((state : RootState) => state.auth.isSignIn);
  return isLandingPage ? (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  ) : (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-gray-500 
      flex items-center justify-center relative overflow-hidden"
    >
      <Routes>
      <Route path="/signup" element={isSignedIn ? <Navigate to="/home" replace /> : <SignUpPage />} />
        <Route path="/verify-email" element={ <VerifyOtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={isSignedIn? <HomePage/> : <Navigate to="/login" /> } />
        
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
