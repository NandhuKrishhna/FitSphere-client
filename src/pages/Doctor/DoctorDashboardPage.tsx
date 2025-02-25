import { useState } from "react";
import toast from "react-hot-toast";
import { addDays, addWeeks, addMonths, format } from "date-fns";
import { useAddSlotsMutation, useCancelSlotMutation, useGetAllSlotsQuery } from "../../redux/api/doctorApi";
import SlotList from "../../components/Doctor/SlotList";
import { Slot } from "../../types/Slot";
import { ErrorResponse } from "../../types/userTypes";
import ConsultationCalendar from "../../components/Doctor/ConsultationCalendar";

type RecurrencePattern = {
  type: "daily" | "weekly" | "monthly";
  endDate: Date;
};

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

  const createSlotPayload = (date: Date) => {
    const startDateTime = new Date(date);
    const [startHour, startMinute] = startTime.split(/[: ]/);
    startDateTime.setHours(
      startTime.includes("PM") ? (parseInt(startHour) % 12) + 12 : parseInt(startHour),
      parseInt(startMinute)
    );

    const endDateTime = new Date(date);
    const [endHour, endMinute] = endTime.split(/[: ]/);
    endDateTime.setHours(
      endTime.includes("PM") ? (parseInt(endHour) % 12) + 12 : parseInt(endHour),
      parseInt(endMinute)
    );

    return {
      startTime: startDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      endTime: endDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      date: date.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }),
      consultationType,
    };
  };
  const generateDatesFromPattern = (startDate: Date, pattern: RecurrencePattern): Date[] => {
    const dates: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= pattern.endDate) {
      dates.push(new Date(currentDate));
      if (pattern.type === "daily") {
        currentDate = addDays(currentDate, 1);
      } else if (pattern.type === "weekly") {
        currentDate = addWeeks(currentDate, 1);
      } else if (pattern.type === "monthly") {
        currentDate = addMonths(currentDate, 1);
      }
    }

    return dates;
  };

  const handleSubmit = async (recurrencePattern?: RecurrencePattern) => {
    if (!selectedDate || !consultationType || !startTime || !endTime) {
      toast.error("Please fill all the fields before submitting.");
      return;
    }

    try {
      if (recurrencePattern) {
        const recurringDates = generateDatesFromPattern(selectedDate, recurrencePattern);
        const totalSlots = recurringDates.length;

        if (totalSlots > 0) {
          toast.loading(`Creating ${totalSlots} recurring slots...`, { duration: 3000 });

          const slotPromises = recurringDates.map(async (date) => {
            const payload = createSlotPayload(date);
            return addSlots(payload).unwrap();
          });
          await Promise.all(slotPromises);

          toast.success(
            `Successfully created ${totalSlots} recurring slots from ${format(selectedDate, "MMM d")} to ${format(
              recurrencePattern.endDate,
              "MMM d"
            )}`
          );
        }
      } else {
        const payload = createSlotPayload(selectedDate);
        const res = await addSlots(payload).unwrap();
        toast.success(res.message);
      }

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
    <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:w-[80%] mx-auto">
      <div className="w-full lg:w-1/2">
        <SlotList slots={slots} isLoading={isSlotsLoading} onCancel={cancelSlot} isCancelLoading={isCancelLoading} />
      </div>
      <div className="w-full lg:w-1/2">
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
