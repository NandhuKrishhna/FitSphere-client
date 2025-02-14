import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddSlotsMutation, useGetAllSlotsQuery } from "../../redux/api/doctorApi";
import SlotList from "../../components/Doctor/SlotList";
import { Slot } from "../../types/Slot";
import { ErrorResponse } from "../../types/userTypes";
import DoctorHeader from "../../components/Doctor/DoctorHeader";
import ConsultationCalendar from "../../components/Doctor/ConsultationCalendar";

const DoctorDashboardPage = () => {
  const [addSlots, { isLoading }] = useAddSlotsMutation();
  const { data, isLoading: isSlotsLoading } = useGetAllSlotsQuery({});
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [consultationType, setConsultationType] = useState<"audio" | "video" | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (data?.response) {
      setSlots(data.response);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!selectedDate || !consultationType || !startTime || !endTime) {
      toast.error("Please fill all the fields before submitting.");
      return;
    }
    console.log(selectedDate);
    console.log(startTime);
    console.log(endTime);
    console.log(consultationType);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const startTimeISO = new Date(`${formattedDate}T${startTime}:00Z`).toISOString();
    const endTimeISO = new Date(`${formattedDate}T${endTime}:00Z`).toISOString();

    try {
      const res = await addSlots({
        startTime: startTimeISO,
        endTime: endTimeISO,
        date: formattedDate,
        consultationType,
      }).unwrap();

      toast.success(res.message);
      setStartTime("");
      setEndTime("");
      setConsultationType(null);
      setSelectedDate(null);
    } catch (error) {
      console.error(error);
      const err = error as ErrorResponse;
      if (err.data?.message) {
        toast.error(err.data.message);
      } else if (err.data?.errors) {
        err.data.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen">
      <DoctorHeader />

      <div className="flex-1 p-4 mt-11 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SlotList slots={slots} isLoading={isSlotsLoading} />

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
          isLoading={isLoading}
          slots={slots}
        />
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
