import { useState } from "react";
import { addDays, format, startOfToday } from "date-fns";
import { Slot } from "../../types/Slot";

type RecurrencePattern = {
  type: "daily" | "weekly" | "monthly";
  endDate: Date;
};

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 5; i <= 21; i++) {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? "AM" : "PM";
    slots.push(`${hour}:00 ${ampm}`, `${hour}:30 ${ampm}`);
  }
  return slots;
};

type calenderHookProps = {
  slots: Slot[];
  onSubmit: (recurrencePattern?: RecurrencePattern) => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const useConsultationCalenderHook = ({ slots, onSubmit, setSelectedDate }: calenderHookProps) => {
  const [startDate, setStartDate] = useState(startOfToday());
  const [enableRecurring, setEnableRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | null>(null);

  const timeSlots = generateTimeSlots();

  const slotCountsByDate = slots.reduce((acc, slot) => {
    const date = format(new Date(slot.date), "yyyy-MM-dd");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nextFiveDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startDate, index);
    const formattedDate = format(date, "yyyy-MM-dd");
    const slotCount = slotCountsByDate[formattedDate] || 0;
    return { date, slots: slotCount };
  });

  const navigateDates = (direction: "prev" | "next") => {
    setStartDate((current) => addDays(current, direction === "next" ? 5 : -5));
    setSelectedDate(null);
  };

  const handleSubmit = () => {
    if (enableRecurring && recurrenceEndDate) {
      const recurrencePattern: RecurrencePattern = {
        type: recurrenceType,
        endDate: recurrenceEndDate,
      };
      onSubmit(recurrencePattern);
    } else {
      onSubmit();
    }
  };
  return {
    handleSubmit,
    navigateDates,
    timeSlots,
    nextFiveDays,
    setEnableRecurring,
    setRecurrenceEndDate,
    setRecurrenceType,
    startDate,
    enableRecurring,
    recurrenceType,
    recurrenceEndDate,
  };
};

export default useConsultationCalenderHook;
