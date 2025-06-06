import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Doctor_Routes from "./routes/Doctor_Routes";
import Admin_Routes from "./routes/Admin_Routes";
import UserRoutes from "./routes/UserRoutes";
import Unauthorized from "./pages/UnAuthorized";
import GlobalSocketListener from "./components/App/GlobalSocketListener";
import NotFound from "./pages/Not-Found";
import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";

const LandingPage = lazy(() => import("./pages/Users/LandingPage"));
function App() {
  return (
    <>
      <GlobalSocketListener />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={
            <div className="h-screen bg-black flex items-center justify-center">
              <Loader className="animate-spin text-gray-600 w-10 h-10" />
            </div>
          }><LandingPage /></Suspense>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/doctor/*" element={<Doctor_Routes />} />
          <Route path="/admin/*" element={<Admin_Routes />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
