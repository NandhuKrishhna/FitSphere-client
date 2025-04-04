import { ChevronLeft, ChevronRight, Phone, Video } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Slot } from "../../types/Slot";
import RecurringSlot from "./RecurringSlot";
import useConsultationCalenderHook from "@/hooks/DoctorHooks/consultationCalenderHook";
import TimeSelect from "./TimeSelect";
import MonthSelect from "./MonthSelect";
import DateSelector from "./DateSelector";
import { RecurrencePattern } from "@/types/types";


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
  const {
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
  } = useConsultationCalenderHook({ slots, onSubmit, setSelectedDate });

  return (
    <Card className="w-full bg-gray-800/50 mt-9 p-4 border-gray-700">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-white">Schedule a Time Slot for Appointments</h1>
        <p className="text-sm font-normal text-gray-300">
          Please fill out all required fields to create new time slots for patient appointments
        </p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <MonthSelect selectedDate={startDate} onChange={(value) => console.log("Selected Month:", value)} />

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200"
            onClick={() => navigateDates("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200"
            onClick={() => navigateDates("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <DateSelector dates={nextFiveDays} selectedDate={selectedDate} onSelect={(date) => setSelectedDate(date)} />

      <div className="mt-6 space-y-4">
        <div className="flex gap-4">
          <Button
            variant={consultationType === "audio" ? "default" : "outline"}
            className={`rounded-lg flex gap-2 flex-1 ${consultationType === "audio"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200"
              }`}
            onClick={() => setConsultationType("audio")}
          >
            <Phone className="h-4 w-4" />
            Audio
          </Button>
          <Button
            variant={consultationType === "video" ? "default" : "outline"}
            className={`rounded-lg flex gap-2 flex-1 ${consultationType === "video"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200"
              }`}
            onClick={() => setConsultationType("video")}
          >
            <Video className="h-4 w-4" />
            Video
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-300">Select Time (Indian Time)</div>
          <div className="grid grid-cols-2 gap-4">
            <TimeSelect label="Start Time" value={startTime} onChange={setStartTime} options={timeSlots} />
            <TimeSelect label="End Time" value={endTime} onChange={setEndTime} options={timeSlots} />
          </div>
        </div>

        <RecurringSlot
          enableRecurring={enableRecurring}
          setEnableRecurring={setEnableRecurring}
          recurrenceType={recurrenceType}
          setRecurrenceType={setRecurrenceType}
          recurrenceEndDate={recurrenceEndDate}
          setRecurrenceEndDate={setRecurrenceEndDate}
          selectedDate={selectedDate}
        />

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          disabled={!selectedDate || !consultationType || !startTime || !endTime || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : enableRecurring ? (
            "Add Recurring Slots"
          ) : (
            "Add Slot"
          )}
        </Button>
      </div>
    </Card>
  );
}
