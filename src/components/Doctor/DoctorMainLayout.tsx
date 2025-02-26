import { Outlet } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";

const DoctorMainLayout = () => {
  return (
    <div className="bg-gradient-to-br from-gray-500 to-black min-h-screen flex flex-col">
      <DoctorHeader />
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorMainLayout;
