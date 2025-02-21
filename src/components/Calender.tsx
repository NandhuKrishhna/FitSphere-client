
import { useState } from "react";

type CalendarDate = {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
};

interface CalendarProps {
  onDateSelect?: (date: CalendarDate) => void;
}

export function Calendar({ onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  const getDaysInMonth = (date: Date): CalendarDate[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: CalendarDate[] = [];
    const prevMonth = new Date(year, month - 1);
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        month: prevMonth.getMonth(),
        year: prevMonth.getFullYear(),
        isCurrentMonth: false,
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        month: month + 1,
        year: year,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1)
      )
    );
  };

  const handleDateSelect = (day: CalendarDate) => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const isDateSelected = (day: CalendarDate) => {
    return (
      selectedDate?.date === day.date &&
      selectedDate?.month === day.month &&
      selectedDate?.year === day.year
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  const isToday = (day: CalendarDate) => {
    return (
      day.date === today.getDate() &&
      day.month === today.getMonth() &&
      day.year === today.getFullYear()
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg shadow-purple-500/20">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigateMonth("prev")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white"
            aria-label="Previous month"
          >
            &#x2190;
          </button>

          <h2 className="text-xl font-semibold text-white">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>

          <button
            onClick={() => navigateMonth("next")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white"
            aria-label="Next month"
          >
            &#x2192;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm text-gray-400 font-medium py-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-full
                ${day.isCurrentMonth ? "text-white" : "text-gray-600"}
                ${isDateSelected(day) ? "bg-indigo-600 hover:bg-indigo-700" : "hover:bg-white/10"}
                ${isToday(day) ? "ring-2 ring-indigo-400" : ""}
                transition-colors
              `}
              onClick={() => handleDateSelect(day)}
            >
              {day.date}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

