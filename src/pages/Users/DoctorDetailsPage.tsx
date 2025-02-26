import Header from "../../components/Header";
import ConsultationModal from "../../components/App/Confirmation";
import { MenuItem, menuItems } from "@/utils/UserDoctorDetails";
import { handleOptionClick } from "@/utils/DoctorDetailsPageUtils";
import { useNavigate } from "react-router-dom";
import { useDoctorDetails } from "@/hooks/App/useDoctorDetails";
import { useDispatch } from "react-redux";

const DoctorDetailsPage = () => {
  const {
    doctorDetails,
    slots,
    selectedDoctorForChat,
    activeSection,
    setActiveSection,
    handleSlotClick,
    handleBookSlot,
    isBookLoading,
  } = useDoctorDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!doctorDetails) return <div>No details available.</div>;

  const getContent = () => {
    switch (activeSection) {
      case "about":
        return <p>{doctorDetails?.details?.bio || "No bio available."}</p>;
      case "experience":
        return <p>{doctorDetails?.details?.experience} years of experience</p>;
      case "consultation":
        return (
          <>
            <p>Consultation Fee: ${doctorDetails?.details?.consultationFees}</p>
            <p>Languages: {doctorDetails?.details?.consultationLanguages}</p>
          </>
        );
      default:
        return <p>Content for {activeSection} section</p>;
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />
      <div className="max-w-6xl mx-auto mt-11 pb-10">
        <div className="flex items-start gap-6 mb-8">
          <div className="relative">
            <img
              src={doctorDetails.profilePicture}
              alt="Doctor profile"
              className="w-25 h-25 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 mt-9 ">
            <h1 className="text-white text-3xl font-semibold pb-3">{doctorDetails.name}</h1>
            <p className="text-purple-400 text-xl">{doctorDetails?.details?.primarySpecialty}</p>
          </div>
          <div className="mt-10">
            <ConsultationModal
              slots={slots || []}
              onSlotClick={handleSlotClick}
              name={doctorDetails.name}
              dept={doctorDetails.details?.primarySpecialty}
            />
            <button
              onClick={handleBookSlot}
              className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isBookLoading ? <span className="loading loading-ring loading-md"></span> : "Book Slot"}
            </button>
          </div>
        </div>
        <div className="flex gap-4 mb-8">
          {["Chat", "Video", "Audio"].map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option, navigate, dispatch, selectedDoctorForChat)}
              className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <span className="text-purple-400">{option}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-8">
          <div className="w-64 space-y-2">
            {menuItems.map((item: MenuItem) => (
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
          <div className="flex-1 bg-gray-800/50 rounded-lg p-6">{getContent()}</div>

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
