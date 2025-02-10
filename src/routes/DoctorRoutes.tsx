import { Route } from 'react-router-dom';
import DoctorSignUp from '../pages/Doctor/DoctorSignUp';
import DoctorOtpVerification from '../pages/Doctor/DoctorOtpVerification';
import ProfessionalDetailsForm from '../pages/Doctor/RegisterAsADoctorPage';
import DoctorLoginPage from '../pages/Doctor/DoctorLoginPage';
import DoctorDashboardPage from '../pages/Doctor/DoctorDashboardPage';

const DoctorRoutes = () => {
  return (
    <>
      <Route path="/doctor/signup" element={<DoctorSignUp />} />
      <Route path="/doctor/verify/otp" element={<DoctorOtpVerification />} />
      <Route path="/doctor/registration" element={<ProfessionalDetailsForm />} />
      <Route path="/doctor/login" element={<DoctorLoginPage />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
    </>
  );
};

export default DoctorRoutes;