import React, { useState } from "react";
import ConsultationModal from "../../components/App/Confirmation";
import { type MenuItem, menuItems } from "@/utils/UserDoctorDetails";
import { handleOptionClick } from "@/utils/DoctorDetailsPageUtils";
import { useNavigate } from "react-router-dom";
import { useDoctorDetails } from "@/hooks/App/useDoctorDetails";
import { useDispatch } from "react-redux";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import { BadgeCheck, Calendar, Mail, Phone, ChevronDown, Star } from "lucide-react";
import PaymentOptionsModal from "@/components/App/PaymentOptions";
import WalletPaymentSuccessModal from "@/components/App/WalletPaymentSuccessModal";
import { useGetReviewsQuery } from "@/redux/api/appApi";

// Add Reviews type
type Review = {
  _id: string;
  userId: string;
  doctorId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  userDetails?: {
    _id: string;
    name: string;
    profilePicture: string;
  };
};

const DoctorDetailsPage: React.FC = () => {
  const {
    doctorDetails,
    slots,
    selectedDoctorForChat,
    activeSection,
    setActiveSection,
    handleSlotClick,
    handleBookSlot: originalHandleBookSlot,
    isBookLoading,
    handleWalletPayment: originalHandleWalletPayment,
    isWalletLoading,
    isWalletSuccessModalOpen,
    handleSuccessModalClose,
  } = useDoctorDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const { data: reviewsData } = useGetReviewsQuery({ doctorId: doctorDetails?._id });

  // Extract review data - add safe fallbacks
  const reviews = reviewsData?.response?.reviews || [];
  const averageRating = reviewsData?.response?.averageRating || 0;
  const totalReviews = reviewsData?.response?.totalReviews || 0;

  const handleBookSlot = (): void => {
    setIsPaymentModalOpen(true);
  };

  const handleWalletPayment = (): void => {
    console.log("Payment with wallet selected");
    originalHandleWalletPayment();
    setIsPaymentModalOpen(false);
  };
  const handleRazorpayPayment = (): void => {
    setIsPaymentModalOpen(false);
    originalHandleBookSlot();
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : star === Math.ceil(rating) && rating % 1 >= 0.5
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-600 text-gray-600"
            }
          />
        ))}
      </div>
    );
  };

  if (!doctorDetails)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-purple-500"></div>
      </div>
    );

  const consultationFee = doctorDetails?.details?.consultationFees || 0;

  const getContent = (): React.ReactNode => {
    switch (activeSection) {
      case "about":
        return <p>{doctorDetails?.details?.bio || "No bio available."}</p>;
      case "experience":
        return <p>{doctorDetails?.details?.experience} years of experience</p>;
      case "consultation":
        return (
          <>
            <p>Consultation Fee: ${consultationFee}</p>
            <p>Languages: {doctorDetails?.details?.consultationLanguages}</p>
          </>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review: Review) => (
                <div key={review._id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                      <img
                        src={review.userDetails?.profilePicture || "/placeholder.svg"}
                        alt={review.userDetails?.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{review.userDetails?.name || "Anonymous User"}</p>
                      <div className="flex items-center">
                        {renderStars(review.rating || 0)}
                        <span className="text-xs text-gray-400 ml-2">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Unknown date"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{review.reviewText || "No review text provided."}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews available.</p>
            )}
          </div>
        );
      default:
        return <p>Content for {activeSection} section</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 mt-11 pb-10">
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          <div className="relative mx-auto md:mx-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
              <img
                src={doctorDetails.profilePicture || "/placeholder.svg"}
                alt="Doctor profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-sm p-1 rounded-full">
              <BadgeCheck className="text-green-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-white text-2xl md:text-3xl font-semibold">{doctorDetails.name}</h1>
            <p className="text-purple-400 text-lg md:text-xl mt-1">{doctorDetails?.details?.primarySpecialty}</p>

            <div className="flex items-center justify-center md:justify-start space-x-2 mt-2 text-gray-400">
              <Calendar size={16} className="text-purple-400" />
              <span>{doctorDetails?.details?.experience}+ Years Experience</span>
            </div>

            {/* Add average rating display */}
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-2">
              {renderStars(averageRating)}
              <span className="text-gray-300 text-sm">
                {averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
              </span>
            </div>

            <div className="md:hidden mt-4 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Phone size={16} className="text-purple-400" />
                <span>{doctorDetails?.details?.contactPhoneNumber || "Not available"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Mail size={16} className="text-purple-400" />
                <span className="truncate">{doctorDetails?.details?.professionalEmail || "Not available"}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-[440px] shrink-0">
            <ConsultationModal
              slots={slots || []}
              onSlotClick={handleSlotClick}
              name={doctorDetails.name}
              dept={doctorDetails.details?.primarySpecialty}
            />
            <button
              onClick={handleBookSlot}
              disabled={isBookLoading}
              className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70"
            >
              {isBookLoading || isWalletLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-start gap-4 mb-8">
          {["Chat", "Video", "Audio"].map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option, navigate, dispatch, selectedDoctorForChat)}
              className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <span className="text-purple-400">{option}</span>
            </button>
          ))}
        </div>

        <div className="md:hidden mb-8">
          <ConsultationModal
            slots={slots || []}
            onSlotClick={handleSlotClick}
            name={doctorDetails.name}
            dept={doctorDetails.details?.primarySpecialty}
          />
          <button
            onClick={handleBookSlot}
            disabled={isBookLoading}
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70 text-lg"
          >
            {isBookLoading ? <span className="loading loading-spinner loading-sm"></span> : "Book Appointment"}
          </button>
        </div>

        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
          >
            <span className="font-medium">{menuItems.find((item) => item.id === activeSection)?.label || "About"}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {mobileMenuOpen && (
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg mt-2 overflow-hidden">
              {menuItems.map((item: MenuItem) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    activeSection === item.id ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 space-y-2">
            {menuItems.map((item: MenuItem) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-gray-800/50 rounded-lg p-6">{getContent()}</div>

          <div className="hidden md:block w-64">
            <div className="bg-gray-800/30 rounded-lg p-6">
              <h2 className="text-white text-lg font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="text-purple-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-gray-200">{doctorDetails?.details?.contactPhoneNumber || "Not available"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="text-purple-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-gray-200 break-all">
                      {doctorDetails?.details?.professionalEmail || "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentOptionsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelectWallet={handleWalletPayment}
        onSelectRazorpay={handleRazorpayPayment}
        amount={consultationFee}
      />
      <WalletPaymentSuccessModal
        isOpen={isWalletSuccessModalOpen}
        onClose={handleSuccessModalClose}
        doctorName={doctorDetails?.name || ""}
        amount={doctorDetails?.details?.consultationFees || 0}
      />
    </div>
  );
};

export default DoctorDetailsPage;
