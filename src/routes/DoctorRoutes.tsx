import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RootState } from "../redux/store";
import DoctorSignUp from "../pages/Doctor/DoctorSignUp";
import DoctorOtpVerification from "../pages/Doctor/DoctorOtpVerification";
import ProfessionalDetailsForm from "../pages/Doctor/RegisterAsADoctorPage";
import DoctorLoginPage from "../pages/Doctor/DoctorLoginPage";
import DoctorDashboardPage from "../pages/Doctor/DoctorDashboardPage";
import AppointmentTable from "../pages/Doctor/AppointmentManagmentPage";



const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isSignIn = useSelector((state: RootState) => state.doctor.isSignIn);

  if (isSignIn) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return children;
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isSignIn = useSelector((state: RootState) => state.doctor.isSignIn);

  if (!isSignIn) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
};


const DoctorRoutes = () => {
  return (
    <>
      <Route
        path="/doctor/signup"
        element={
          <PublicRoute>
            <DoctorSignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/doctor/verify/otp"
        element={
          <PublicRoute>
            <DoctorOtpVerification />
          </PublicRoute>
        }
      />
      <Route
        path="/doctor/registration"
        element={
          <PublicRoute>
            <ProfessionalDetailsForm />
          </PublicRoute>
        }
      />
      <Route
        path="/doctor/login"
        element={
          <PublicRoute>
            <DoctorLoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/doctor/dashboard"
        element={
          <PrivateRoute>
            <DoctorDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <PrivateRoute>
            <AppointmentTable />
          </PrivateRoute>
        }
      />
    </>
  );
};

export default DoctorRoutes;