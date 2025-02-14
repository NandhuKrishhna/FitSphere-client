import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import DoctorSignUp from "../pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "../pages/Doctor/DoctorOtpVerification";
import ProfessionalDetailsForm from "../pages/Doctor/RegisterAsADoctorPage";
import DoctorLoginPage from "../pages/Doctor/DoctorLoginPage";
import DoctorDashboardPage from "../pages/Doctor/DoctorDashboardPage";
import AppointmentTable from "../pages/Doctor/AppointmentManagmentPage";

const Doctor_Routes = () => {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>

    <Route path="/signup" element={<DoctorSignUp />} />
    <Route path="/verify/otp" element={<DoctorOtpVerification />} />
    <Route path="/registration" element={<ProfessionalDetailsForm />} />
    <Route path="/login" element={<DoctorLoginPage />} />
    <Route path="/dashboard" element={<DoctorDashboardPage />} />
    <Route path="/appointments" element={<AppointmentTable />} />
    
    </Route>
    </Routes>
  );
};

export default Doctor_Routes;
