import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import DoctorSignUp from "../pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "../pages/Doctor/DoctorOtpVerification";
import ProfessionalDetailsForm from "../pages/Doctor/RegisterAsADoctorPage";
import DoctorLoginPage from "../pages/Doctor/DoctorLoginPage";
import DoctorDashboardPage from "../pages/Doctor/DoctorDashboardPage";
import AppointmentTable from "../pages/Doctor/AppointmentManagmentPage";
import RequireAuth from "../components/RequiredAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slice/Auth_Slice";

const Doctor_Routes = () => {
  const token = useSelector(selectCurrentToken)
  return (
    <Routes>
    <Route path="/" element={<Layout />}>

    <Route path="/signup" element={<DoctorSignUp />} />
    <Route path="/verify/otp" element={<DoctorOtpVerification />} />
    <Route path="/registration" element={<ProfessionalDetailsForm />} />
    <Route path="/login" element={<DoctorLoginPage />} />
    <Route element={<RequireAuth token={token} redirectTo={"/doctor/login"}/>}>
    <Route path="/dashboard" element={<DoctorDashboardPage />} />
    <Route path="/appointments" element={<AppointmentTable />} />
    </Route>
    </Route>
    </Routes>
  );
};

export default Doctor_Routes;
