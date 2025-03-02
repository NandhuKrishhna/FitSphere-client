import { useGetAllSlotsQuery } from "../../redux/api/doctorApi";
import SlotList from "../../components/Doctor/SlotList";
import { Slot } from "../../types/Slot";
import ConsultationCalendar from "../../components/Doctor/ConsultationCalendar";
import useDoctorSlotAddingHook from "@/hooks/DoctorHooks/doctorSlotAddingHook";

const DoctorDashboardPage = () => {
  const {
    selectedDate,
    setSelectedDate,
    consultationType,
    setConsultationType,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleSubmit,
    cancelSlot,
    isCancelLoading,

    isAddingSlotLoading,
  } = useDoctorSlotAddingHook();
  const { data, isLoading: isSlotsLoading } = useGetAllSlotsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  // console.log("All slots : ", data);
  const slots: Slot[] = data?.response || [];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:w-[80%] mx-auto">
      <div className="w-full lg:w-1/2 mt-9">
        <SlotList slots={slots} isLoading={isSlotsLoading} onCancel={cancelSlot} isCancelLoading={isCancelLoading} />
      </div>
      <div className="w-full lg:w-1/2 mb-10">
        <ConsultationCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          consultationType={consultationType}
          setConsultationType={setConsultationType}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onSubmit={handleSubmit}
          isLoading={isAddingSlotLoading}
          slots={slots}
        />
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
