import { useState } from "react";
import { addDays, format, startOfToday, addWeeks, addMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Phone, Video, Repeat, Calendar } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Slot } from "../../types/Slot";

// Generate time slots from 5 AM to 9 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 5; i <= 21; i++) {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? "AM" : "PM";
    slots.push(`${hour}:00 ${ampm}`, `${hour}:30 ${ampm}`);
  }
  return slots;
};

type RecurrencePattern = {
  type: "daily" | "weekly" | "monthly";
  endDate: Date;
};

export default function ConsultationCalendar({
  selectedDate,
  setSelectedDate,
  consultationType,
  setConsultationType,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSubmit,
  isLoading,
  slots,
}: {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  consultationType: "audio" | "video" | null;
  setConsultationType: React.Dispatch<React.SetStateAction<"audio" | "video" | null>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (recurrencePattern?: RecurrencePattern) => void;
  isLoading: boolean;
  slots: Slot[];
}) {
  const [startDate, setStartDate] = useState(startOfToday());
  const [enableRecurring, setEnableRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | null>(null);

  const timeSlots = generateTimeSlots();

  // Calculate the default end date for recurrence (4 weeks from now)
  const defaultEndDate = addWeeks(startOfToday(), 4);

  const slotCountsByDate = slots.reduce((acc, slot) => {
    const date = format(new Date(slot.date), "yyyy-MM-dd");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nextFiveDays = Array.from({ length: 5 }).map((_, index) => {
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

  return (
    <Card className="w-full bg-white mt-9 p-4">
      <div className="flex flex-col items-center justify-center p-4 text-xl font-bold">
        <h1 className="">Schedule a Time Slot for Appointments</h1>
        <p className="text-sm font-normal">
          Please fill out all required fields to create new time slots for patient appointments
        </p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={format(startDate, "MMMM yyyy")} />
          </SelectTrigger>
          <SelectContent className="bg-white h-48">
            {Array.from({ length: 12 }).map((_, i) => (
              <SelectItem key={i} value={`month-${i + 1}`}>
                {format(new Date(2024, i, 1), "MMMM yyyy")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigateDates("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigateDates("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4">
        {nextFiveDays.map(({ date, slots }) => (
          <button
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`flex-shrink-0 w-[72px] p-3 rounded-lg border ${
              selectedDate?.toISOString() === date.toISOString()
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-500"
            }`}
          >
            <div className="text-sm text-purple-600">{format(date, "EEE")}</div>
            <div className="text-xl font-semibold mt-1">{format(date, "d")}</div>
            {slots > 0 && (
              <div className="text-xs mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${slots > 5 ? "bg-green-500" : "bg-yellow-500"} mr-1`}
                />
                {slots} slots
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex gap-4">
          <Button
            variant={consultationType === "audio" ? "default" : "outline"}
            className="rounded-lg flex gap-2 flex-1"
            onClick={() => setConsultationType("audio")}
          >
            <Phone className="h-4 w-4" />
            Audio
          </Button>
          <Button
            variant={consultationType === "video" ? "default" : "outline"}
            className="rounded-lg flex gap-2 flex-1"
            onClick={() => setConsultationType("video")}
          >
            <Video className="h-4 w-4" />
            Video
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Select Time (Indian Time)</div>
          <div className="grid grid-cols-2 gap-4">
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger>
                <SelectValue placeholder="Start Time" />
              </SelectTrigger>
              <SelectContent className="bg-white text-purple-800">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger>
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent className="bg-white text-purple-800">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recurring Slots Section - Using Tailwind only */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Make this a recurring slot</span>
            </div>

            {/* Custom checkbox instead of Switch component */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enableRecurring}
                onChange={() => setEnableRecurring(!enableRecurring)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>

          {enableRecurring && (
            <div className="mt-4 space-y-4 rounded-md bg-purple-50 p-3">
              <div className="flex gap-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="recurrenceType"
                    className="w-4 h-4 text-purple-600 bg-white border-purple-300 focus:ring-purple-500"
                    checked={recurrenceType === "daily"}
                    onChange={() => setRecurrenceType("daily")}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Daily</span>
                </label>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="recurrenceType"
                    className="w-4 h-4 text-purple-600 bg-white border-purple-300 focus:ring-purple-500"
                    checked={recurrenceType === "weekly"}
                    onChange={() => setRecurrenceType("weekly")}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Weekly</span>
                </label>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="recurrenceType"
                    className="w-4 h-4 text-purple-600 bg-white border-purple-300 focus:ring-purple-500"
                    checked={recurrenceType === "monthly"}
                    onChange={() => setRecurrenceType("monthly")}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Monthly</span>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : format(defaultEndDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-indigo-400" align="start">
                    <div className="p-3">
                      <div className="text-sm">Select an end date</div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          variant="outline"
                          className="text-xs"
                          onClick={() => setRecurrenceEndDate(addWeeks(startOfToday(), 1))}
                        >
                          +1 Week
                        </Button>
                        <Button
                          variant="outline"
                          className="text-xs"
                          onClick={() => setRecurrenceEndDate(addWeeks(startOfToday(), 4))}
                        >
                          +4 Weeks
                        </Button>
                        <Button
                          variant="outline"
                          className="text-xs"
                          onClick={() => setRecurrenceEndDate(addMonths(startOfToday(), 3))}
                        >
                          +3 Months
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="text-xs text-purple-700 italic">
                This will create slots on{" "}
                {recurrenceType === "daily"
                  ? "every day"
                  : recurrenceType === "weekly"
                  ? `every ${format(selectedDate || startOfToday(), "EEEE")}`
                  : `on the ${format(selectedDate || startOfToday(), "do")} of each month`}{" "}
                until {format(recurrenceEndDate || defaultEndDate, "PPP")}.
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full bg-purple-500 hover:bg-purple-600"
          disabled={!selectedDate || !consultationType || !startTime || !endTime || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Booking..." : enableRecurring ? "Add Recurring Slots" : "Add Slot"}
        </Button>
      </div>
    </Card>
  );
}
