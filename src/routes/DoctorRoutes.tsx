import { Route } from "react-router-dom";
import DoctorSignUp from "../pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "../pages/Doctor/DoctorOtpVerification";
import DoctorProfileForm from "../pages/Doctor/RegisterAsADoctorPage";

const DoctorRoutes = () => {
  return (
    <>
      <Route path="/doctor/signup" element={<DoctorSignUp />} />
      <Route path="/doctor/verify/otp" element={<DoctorOtpVerification />} />
      <Route path="/doctor/registration" element={<DoctorProfileForm />} />
    </>
  );
};

export default DoctorRoutes;
