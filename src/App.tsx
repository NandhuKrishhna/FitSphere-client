import {Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import AdminRoutes from "./routes/AdminRoutes";;
import DoctorRoutes from "./routes/DoctorRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <div>
      <Routes>
        {UserRoutes()}
        {/* Doctor Routes */}
        {DoctorRoutes()}
        {/* Admin Routes */}
        {AdminRoutes()}
      </Routes>
      <Toaster  />
    </div>
  );
}

export default App;