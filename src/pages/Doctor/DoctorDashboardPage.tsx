import { useState } from "react";
import toast from "react-hot-toast";
import { useAddSlotsMutation, useCancelSlotMutation, useGetAllSlotsQuery } from "../../redux/api/doctorApi";
import SlotList from "../../components/Doctor/SlotList";
import { Slot } from "../../types/Slot";
import { ErrorResponse } from "../../types/userTypes";
import ConsultationCalendar from "../../components/Doctor/ConsultationCalendar";

const DoctorDashboardPage = () => {
  const [cancelSlot, { isLoading: isCancelLoading }] = useCancelSlotMutation();
  const [addSlots, { isLoading }] = useAddSlotsMutation();

  const { data, isLoading: isSlotsLoading } = useGetAllSlotsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("All slots : ", data);
  const slots: Slot[] = data?.response || [];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [consultationType, setConsultationType] = useState<"audio" | "video" | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = async () => {
    if (!selectedDate || !consultationType || !startTime || !endTime) {
      toast.error("Please fill all the fields before submitting.");
      return;
    }

    try {
      const startDateTime = new Date(selectedDate);
      const [startHour, startMinute] = startTime.split(/[: ]/);
      startDateTime.setHours(
        startTime.includes("PM") ? (parseInt(startHour) % 12) + 12 : parseInt(startHour),
        parseInt(startMinute)
      );

      const endDateTime = new Date(selectedDate);
      const [endHour, endMinute] = endTime.split(/[: ]/);
      endDateTime.setHours(
        endTime.includes("PM") ? (parseInt(endHour) % 12) + 12 : parseInt(endHour),
        parseInt(endMinute)
      );

      const payload = {
        startTime: startDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        endTime: endDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        date: selectedDate.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }),
        consultationType,
      };

      const res = await addSlots(payload).unwrap();
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
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="w-full md:w-1/2 mt-7">
        <SlotList slots={slots} isLoading={isSlotsLoading} onCancel={cancelSlot} isCancelLoading={isCancelLoading} />
      </div>
      <div className="w-full md:w-[440px]">
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
