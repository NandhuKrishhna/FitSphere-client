import { Outlet } from "react-router-dom";
import Header from "../App/Header";
import Navigation from "../App/Navigation";

const DoctorMainLayout = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorMainLayout;
