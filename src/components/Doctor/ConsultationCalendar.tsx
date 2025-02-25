import { useState } from "react";
import { addDays, format, startOfToday } from "date-fns";
import { ChevronLeft, ChevronRight, Phone, Video } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
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
  onSubmit: () => void;
  isLoading: boolean;
  slots: Slot[];
}) {
  const [startDate, setStartDate] = useState(startOfToday());

  const timeSlots = generateTimeSlots();

  const slotCountsByDate = slots.reduce((acc, slot) => {
    const date = format(new Date(slot.date), "yyyy-MM-dd");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nextFiveDays = Array.from({ length: 5 }).map((_, index) => {
    const date = addDays(startDate, index);
    const formattedDate = format(date, "yyyy-MM-dd");
    const slots = slotCountsByDate[formattedDate] || 0;
    return { date, slots };
  });

  const navigateDates = (direction: "prev" | "next") => {
    setStartDate((current) => addDays(current, direction === "next" ? 5 : -5));
    setSelectedDate(null);
  };

  return (
    <Card className="w-[full] bg-white mt-9 p-4">
      <div className="flex flex-col items-center justify-center p-4 text-xl font-bold">
        <h1 className="">Schedule a Time Slot for Appointments </h1>
        <p className="text-sm font-normal">
          Please fill out all required fields to create a new time slot for patient appointments
        </p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={format(startDate, "MMMM yyyy")} />
          </SelectTrigger>
          <SelectContent className="bg-indigo-300 h-48">
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

        <Button
          className="w-full bg-purple-500 hover:bg-purple-600"
          disabled={!selectedDate || !consultationType || !startTime || !endTime || isLoading}
          onClick={onSubmit}
        >
          {isLoading ? "Booking..." : "Add Slot"}
        </Button>
      </div>
    </Card>
  );
}
