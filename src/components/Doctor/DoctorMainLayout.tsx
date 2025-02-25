import { Outlet } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";

const DoctorMainLayout = () => {
  return (
    <div className="bg-gradient-to-br from-gray-500 to-black min-h-screen">
      <DoctorHeader />
      <main className="max-w-7xl mx-auto p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorMainLayout;
