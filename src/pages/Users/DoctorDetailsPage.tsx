import { useState } from "react";
import { useDoctorDetailsQuery, useGetAllSlotDetailsQuery } from "../../redux/api/appApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import Calendar from "../../components/App/SlotCalender";


const DoctorDetailsPage = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const doctorId = useSelector((state: RootState) => state.appFeat.selectedDoctorId);
  console.log("doctorId",doctorId)
  const { data, isLoading } = useDoctorDetailsQuery({ doctorId });
  const {data:slots}  = useGetAllSlotDetailsQuery({doctorId})
  if (isLoading) return <div>Loading...</div>;
  // console.log("SLOTss",slots)
  const doctorDetails = data?.doctorDetails;
  
  if (!doctorDetails) return <div>No details available.</div>;
  const handleSlotClick = (slot: any) => {
    setSelectedSlot(slot); 
  };



  const handleBookSlot = () => {
    if (!selectedSlot) {
      alert("Please select a slot before booking.");
      return;
    }
    const { date, startTime, endTime } = selectedSlot;
    alert(`You have booked a slot:\n
    Doctor ID: ${doctorId}
    Date: ${date}
    Time: ${startTime} - ${endTime}`);
  };




  const menuItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "services", label: "Services Offered" },
    { id: "reviews", label: "Reviews" },
    { id: "consultation", label: "Consultation Fees" },
    { id: "packages", label: "Packages and Benefits" },
    { id: "awards", label: "Awards" },
    { id: "additional", label: "Additional Features" },
  ];

  const getContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <div className="space-y-4 text-gray-300">
            <p>{doctorDetails?.details?.bio || "No bio available."}</p>
          </div>
        );
      case "experience":
        return (
          <div className="text-gray-300">
            <p>{doctorDetails?.details?.experience} years of experience</p>
          </div>
        );
      case "consultation":
        return (
          <div className="text-gray-300">
            <p>Consultation Fee: ${doctorDetails?.details?.consultationFees}</p>
            <p>Languages: {doctorDetails?.details?.consultationLanguages}</p>
          </div>
        );
      default:
        return <div className="text-gray-300">Content for {activeSection} section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
       <Header/>
      <div className="max-w-6xl mx-auto mt-11 pb-10">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="relative">
            <img
              src={doctorDetails.ProfilePicture}
              alt="Doctor profile"
              className="w-25 h-25 rounded-lg object-cover"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></span>
          </div>
          <div className="flex-1 mt-9 ">
            <h1 className="text-white text-3xl font-semibold pb-3">{doctorDetails.name}</h1>
            <p className="text-purple-400 text-xl">{doctorDetails?.details?.primarySpecialty}</p>
            <button className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors">
              Follow
            </button>
          </div>
          <div className="mt-10">

          <Calendar slots={slots || []} onSlotClick={handleSlotClick} />

            <button 
            onClick={handleBookSlot}
            className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Book Slot
            </button>
          </div>
        </div>

        {/* Communication Options */}
        <div className="flex gap-4 mb-8">
          {["Chat", "Video", "Audio"].map((option) => (
            <button
              key={option}
              className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <span className="text-purple-400">{option}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-8">

          <div className="w-64 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-gray-800/50 rounded-lg p-6">{getContent()}</div>

          {/* Booking Option */}
          <div className="w-64">
            <h2 className="text-white text-lg mb-4">Contact</h2>
            <p className="text-gray-300">Phone: {doctorDetails?.details?.contactPhoneNumber}</p>
            <p className="text-gray-300">Email: {doctorDetails?.details?.professionalEmail}</p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
