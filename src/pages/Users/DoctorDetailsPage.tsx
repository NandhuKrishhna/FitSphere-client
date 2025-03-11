import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDoctorDetails } from "@/hooks/App/useDoctorDetails";
import { useGetReviewsQuery } from "@/redux/api/appApi";
import { handleOptionClick } from "@/utils/DoctorDetailsPageUtils";

import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import PaymentOptionsModal from "@/components/App/PaymentOptions";
import WalletPaymentSuccessModal from "@/components/App/WalletPaymentSuccessModal";
import DoctorProfile from "@/components/App/DoctorProfile";
import AppointmentSection from "@/components/App/AppointmentSection";
import CommunicationOptions from "@/components/App/CommunicationOptions";
import InfoTabs from "@/components/App/InfoTabs";
import ContactInformation from "@/components/App/ContactInformation";

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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const { data: reviewsData } = useGetReviewsQuery({ doctorId: doctorDetails?._id });

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

  const handleCommunicationOption = (option: string): void => {
    handleOptionClick(option, navigate, dispatch, selectedDoctorForChat);
  };

  if (!doctorDetails)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-purple-500"></div>
      </div>
    );

  const consultationFee = doctorDetails?.details?.consultationFees || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      <Header />
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 mt-11 pb-10">
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          <DoctorProfile doctorDetails={doctorDetails} averageRating={averageRating} totalReviews={totalReviews} />

          <div className="hidden md:block md:w-[440px] shrink-0">
            <AppointmentSection
              slots={slots || []}
              doctorName={doctorDetails.name}
              specialty={doctorDetails.details?.primarySpecialty}
              handleSlotClick={handleSlotClick}
              handleBookSlot={handleBookSlot}
              isLoading={isBookLoading || isWalletLoading}
            />
          </div>
        </div>

        <CommunicationOptions onOptionClick={handleCommunicationOption} />

        <div className="md:hidden mb-8">
          <AppointmentSection
            slots={slots || []}
            doctorName={doctorDetails.name}
            specialty={doctorDetails.details?.primarySpecialty}
            handleSlotClick={handleSlotClick}
            handleBookSlot={handleBookSlot}
            isLoading={isBookLoading}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <InfoTabs
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            doctorDetails={doctorDetails}
            reviews={reviews}
            renderTabContent={true}
          />

          <ContactInformation doctorDetails={doctorDetails} />
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
