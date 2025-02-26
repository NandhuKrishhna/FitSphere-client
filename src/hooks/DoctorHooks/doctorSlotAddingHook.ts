import { useAddSlotsMutation, useCancelSlotMutation } from "@/redux/api/doctorApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";
import { addDays, addWeeks, addMonths, format } from "date-fns";
type RecurrencePattern = {
  type: "daily" | "weekly" | "monthly";
  endDate: Date;
};
const useDoctorSlotAddingHook = () => {
  const [cancelSlot, { isLoading: isCancelLoading }] = useCancelSlotMutation();
  const [addSlots, { isLoading: isAddingSlotLoading }] = useAddSlotsMutation();
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
  return {
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
    addSlots,
    isAddingSlotLoading,
  };
};

export default useDoctorSlotAddingHook;
