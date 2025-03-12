import Calendar from "@/components/Doctor/calendar";
import DoctorProfile from "@/components/Doctor/doctor-profile";
import PatientList from "@/components/Doctor/patient-list";
import ReviewsRatings from "@/components/Doctor/reviews-ratings";
import TotalEarnings from "@/components/Doctor/total-earnings";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function DoctorProflePage() {
  const [selectedMonth, setSelectedMonth] = useState("September");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Upcoming");
  const [selectedEarningsView, setSelectedEarningsView] = useState("Monthly");
  const user = useSelector(selectCurrentUser);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* First Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-indigo-100/90 rounded-xl p-5">
            <Calendar selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
          </div>
          <div className="bg-black/80 rounded-xl p-5 flex-grow">
            <ReviewsRatings id={user?._id} />
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-indigo-100/90 rounded-xl p-5">
            <PatientList selectedTimeFrame={selectedTimeFrame} onTimeFrameChange={setSelectedTimeFrame} />
          </div>
          <div className="bg-indigo-100/90 rounded-xl p-5 flex-grow">
            <TotalEarnings selectedView={selectedEarningsView} onViewChange={setSelectedEarningsView} />
          </div>
        </div>

        {/* Third Column */}
        <div className="bg-indigo-100/90 rounded-xl p-0 overflow-hidden">
          <DoctorProfile />
        </div>
      </div>
    </div>
  );
}
