import { useGetAllSlotsQuery } from "../../redux/api/doctorApi";
import SlotList from "../../components/Doctor/SlotList";
import { Slot } from "../../types/Slot";
import ConsultationCalendar from "../../components/Doctor/ConsultationCalendar";
import useDoctorSlotAddingHook from "@/hooks/DoctorHooks/doctorSlotAddingHook";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";

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

  const slots: Slot[] = data?.response || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Doctor Dashboard</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <SlotList
              slots={slots}
              isLoading={isSlotsLoading}
              onCancel={cancelSlot}
              isCancelLoading={isCancelLoading}
            />
          </div>

          <div className="w-full lg:w-1/2 mb-10">
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
