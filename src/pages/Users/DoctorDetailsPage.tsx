import { useState } from "react";
import { useBookSlotsMutation, useDoctorDetailsQuery, useGetAllSlotDetailsQuery, useVerifyPaymentMutation } from "../../redux/api/appApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import  { Slot } from "../../components/App/SlotCalender";
import toast from "react-hot-toast";
import { Order, RazorpayErrorResponse, RazorpayResponse } from "../../types/Payments";
import ConsultationModal from "../../components/App/Confirmation";
import { selectCurrentUser } from "../../redux/slice/Auth_Slice";


const DoctorDetailsPage = () => {
  const doctorId = useSelector((state: RootState) => state.appFeat.selectedDoctorId);
  const user = useSelector(selectCurrentUser);
  
  const [activeSection, setActiveSection] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // console.log("doctorId",doctorId)
  // slot booking mutation
  const [bookSlots, {isLoading: isBookLoading}] = useBookSlotsMutation()
  // getting doctordetails query
  const { data } = useDoctorDetailsQuery({ doctorId });
  // fetching all slots available for the doctor
  const {data:slots}  = useGetAllSlotDetailsQuery({doctorId})
  const doctorDetails = data?.doctorDetails;

   const [verifyPayment] = useVerifyPaymentMutation()
  
  if (!doctorDetails) return <div>No details available.</div>;
  const handleSlotClick = (slot: Slot) => {
    console.log("button clicked");
    setSelectedSlot(slot); 
  };

  const initPay = (order: Order) => {
    console.log("Initializing payment with order:", order); 
  
    if (!(window as any).Razorpay) {
      console.error("Razorpay SDK not loaded");
      toast.error("Razorpay SDK not loaded. Please try again.");
      return;
    }
    if (!order.id || !order.amount || !order.currency) {
      console.error("Missing required order details:", order);
      toast.error("Invalid order details");
      return;
    }
  
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Payment for consultation",
      order_id: order.id,
      handler: async function(response: RazorpayResponse) {
        try {
          console.log("Payment successful!", response);
          await verifyPayment({razorpay_order_id: response.razorpay_order_id})
           toast.success("Payment successful!");
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Payment verification failed");
        }
     
      },
      prefill: {
        name: `${user?.name}`,
        email: `${user?.email}`,
        contact: `${user?.email}`,
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    console.log("Razorpay options:", options); 
  
    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function(response: RazorpayErrorResponse) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });
  
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay instance:", error);
      toast.error("Failed to initialize payment");
    }
  };
  
  const handleBookSlot = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot to book a consultation.");
      return;
    }
    const patientId = user?._id
    try {
      const response = await bookSlots({
        doctorId,
        patientId,
        slotId: selectedSlot?._id,
        amount: doctorDetails.details.consultationFees
      }).unwrap();
  
      console.log("Booking response:", response); 
  
      if (!response.order) {
        throw new Error("No order details received from server");
      }
  
      initPay(response.order);
    } catch (error) {
      console.error("Error booking slot:", error);
      toast.error("Failed to book slot. Please try again.");
    }
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
       <Header/>
      <div className="max-w-6xl mx-auto mt-11 pb-10">
        <div className="flex items-start gap-6 mb-8">
          <div className="relative">
            <img
              src={doctorDetails.ProfilePicture}
              alt="Doctor profile"
              className="w-25 h-25 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 mt-9 ">
            <h1 className="text-white text-3xl font-semibold pb-3">{doctorDetails.name}</h1>
            <p className="text-purple-400 text-xl">{doctorDetails?.details?.primarySpecialty}</p>
          </div>
          <div className="mt-10">

          {/* <Calendar slots={slots || []} onSlotClick={handleSlotClick} /> */}
          <ConsultationModal slots={slots || []} onSlotClick={handleSlotClick} name={doctorDetails.name} dept={doctorDetails.details?.primarySpecialty} />

            <button 
            onClick={handleBookSlot}
            className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              {isBookLoading? <span className="loading loading-ring loading-md"></span> : "Book Slot"}
            </button>
          </div>
        </div>

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
