import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, parseISO } from "date-fns";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface CalendarProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  slots?: Slot[];
}

export default function Calendar({ selectedMonth, onMonthChange, slots = [] }: CalendarProps) {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    // Update the month when the component mounts
    onMonthChange(format(new Date(), "MMMM"));
  }, [onMonthChange]);

  const goToPreviousWeek = () => {
    const newWeekStart = addDays(weekStart, -7);
    setWeekStart(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = addDays(weekStart, 7);
    setWeekStart(newWeekStart);
  };

  // Generate the days for the current week
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dayNumber = date.getDate();
    const dayName = format(date, "EEE");
    const isToday = isSameDay(date, new Date());

    // Count slots for this day
    const slotsForDay = slots.filter((slot) => {
      const slotDate = parseISO(slot.date);
      return isSameDay(slotDate, date);
    });

    return {
      date,
      num: dayNumber,
      day: dayName,
      isSelected: isToday,
      slotCount: slotsForDay.length,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md font-semibold">Upcoming Meetings</h2>
        <div className="relative">
          <div
            className="flex items-center gap-2 bg-indigo-200/80 rounded-full px-4 py-1 cursor-pointer"
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
          >
            <span className="text-sm">{selectedMonth}</span>
            <ChevronDown size={14} />
          </div>

          {isMonthDropdownOpen && (
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md py-1 z-10 w-32">
              {months.map((month) => (
                <div
                  key={month}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    onMonthChange(month);
                    setIsMonthDropdownOpen(false);
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousWeek} className="p-1 rounded-full hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm font-medium">
          {format(weekStart, "MMMM d")} - {format(addDays(weekStart, 6), "MMMM d, yyyy")}
        </span>

        <button onClick={goToNextWeek} className="p-1 rounded-full hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-between mt-4">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center rounded-full w-12 h-12 relative ${
              day.isSelected ? "bg-yellow-300" : "bg-white"
            }`}
          >
            <span className="text-sm font-semibold">{day.num}</span>
            <span className="text-xs">{day.day}</span>

            {day.slotCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {day.slotCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
