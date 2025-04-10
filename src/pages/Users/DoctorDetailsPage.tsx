import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDoctorDetails } from "@/hooks/App/useDoctorDetails";
import { useGetConversationQuery, useGetReviewsQuery } from "@/redux/api/appApi";
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
import useCreateConversation from "@/hooks/App/useCreateConversation";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { selectedDoctorId } from "@/redux/slice/appFeatSlice";
import { setUsers } from "@/redux/slice/socket.ioSlice";

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
    refetch,
  } = useDoctorDetails();
  const doctorId = useSelector(selectedDoctorId)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const { data: reviewsData } = useGetReviewsQuery(doctorId ?? "", { skip: !doctorId });
  console.log(reviewsData)
  const reviews = reviewsData?.response?.reviews || [];
  const averageRating = reviewsData?.response?.averageRating || 0;
  const totalReviews = reviewsData?.response?.totalReviews || 0;
  const { createConversationHandler } = useCreateConversation();
  const currentUserId = useSelector(selectCurrentUser)?._id
  const handleBookSlot = (): void => {
    setIsPaymentModalOpen(true);
  };
  const { data: getConversation, isFetching } = useGetConversationQuery(doctorId);
  const handleWalletPayment = (): void => {
    originalHandleWalletPayment();
    setIsPaymentModalOpen(false);
  };
  // backend update the slot as expired in every 30 mintues so 
  // we also want to update htis in the frontend...
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleRazorpayPayment = (): void => {
    setIsPaymentModalOpen(false);
    originalHandleBookSlot();
  };

  const handleCommunicationOption = (option: string): void => {
    handleOptionClick(
      option,
      navigate,
      dispatch,
      selectedDoctorForChat,
      currentUserId,
      createConversationHandler,
      getConversation,
      isFetching
    );
    dispatch(setUsers([selectedDoctorForChat]));
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
            doctorName={doctorDetails.name}
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
