import React from "react";
import ConsultationModal from "../App/Confirmation";

type AppointmentSectionProps = {
  slots: Array<any>;
  doctorName: string;
  specialty?: string;
  handleSlotClick: (slot: any) => void;
  handleBookSlot: () => void;
  isLoading: boolean;
};

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  slots,
  doctorName,
  specialty,
  handleSlotClick,
  handleBookSlot,
  isLoading,
}) => {
  return (
    <>
      <ConsultationModal slots={slots} onSlotClick={handleSlotClick} name={doctorName} dept={specialty} />
      <button
        onClick={handleBookSlot}
        disabled={isLoading}
        className="w-full mt-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70"
      >
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Book Appointment"}
      </button>
    </>
  );
};

export default AppointmentSection;
