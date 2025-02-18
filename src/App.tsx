import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Users/LandingPage";
import Layout from "./components/Layout";
import UserRoutes from "./routes/UserRoutes";
import Doctor_Routes from "./routes/Doctor_Routes";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        {/*User Routes*/}
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<Doctor_Routes />} />
      </Route>
    </Routes>
  );
}

export default App;
