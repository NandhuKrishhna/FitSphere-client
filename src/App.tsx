import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Users/LandingPage";
import Layout from "./components/Layout";
import Doctor_Routes from "./routes/Doctor_Routes";
import Admin_Routes from "./routes/Admin_Routes";
import UserRoutes from "./routes/UserRoutes";
import Unauthorized from "./pages/UnAuthorized";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<Doctor_Routes />} />
        <Route path="/admin/*" element={<Admin_Routes />} />
      </Route>
    </Routes>
  );
}

export default App;
