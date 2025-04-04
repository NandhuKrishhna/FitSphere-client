import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayInfo, DaySelectorProps } from "@/types/calories.types";
import { generateWeekDays, handleDaySelect } from "@/utils/daySelectorUtils";
import { isToday } from "date-fns";

export default function DaySelector({ selectedDay, setSelectedDay }: DaySelectorProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [days, setDays] = useState<DayInfo[]>([]);

  const handlePreviousWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setDays(generateWeekDays(newStart));
  };

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setDays(generateWeekDays(newStart));
  };

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;

    const weekStart = new Date(today);
    weekStart.setDate(diff);

    setCurrentWeekStart(weekStart);
    setDays(generateWeekDays(weekStart));
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-4">
      <div className="flex justify-between items-center">
        <button className="p-2" onClick={handlePreviousWeek}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide px-2">
          {days.map((day, index) => (
            <button
              key={index}
              className={`flex flex-col items-center px-1 ${selectedDay === day.date ? "text-white" : isToday(day.date) ? "text-blue-400" : "text-gray-500"
                }`}
              onClick={() => handleDaySelect(day.date, setSelectedDay)}
            >
              <span className="text-xs">{day.name}</span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${selectedDay === day.date
                    ? "bg-orange-500"
                    : isToday(day.date)
                      ? "bg-blue-800 border border-blue-500"
                      : "bg-gray-800"
                  }`}
              >
                <span className="text-sm">{day.dateObj.getDate()}</span>
              </div>
              <span className="text-xs mt-1">
                {day.dateObj.getMonth() + 1}/{day.dateObj.getDate()}
              </span>
            </button>
          ))}
        </div>
        <button className="p-2" onClick={handleNextWeek}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
