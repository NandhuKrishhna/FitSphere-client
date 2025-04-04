import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarDate } from "@/types/Slot";
import { SlotCalendarProps } from "@/types/types";


const Calendar = ({ onDateSelect }: SlotCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const getMonthDaysGrid = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = getDaysInMonth(date);
    const grid = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({
        date: prevMonthDays - i,
        month: month - 1,
        year,
        isCurrentMonth: false,
      });
    }
    days.forEach((day) => {
      grid.push({
        date: day,
        month,
        year,
        isCurrentMonth: true,
      });
    });

    const totalCells = 42;
    const nextMonthDays = totalCells - grid.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      grid.push({
        date: i,
        month: month + 1,
        year,
        isCurrentMonth: false,
      });
    }

    return grid;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDateClick = (day: CalendarDate) => {
    if (!day.isCurrentMonth) return;
    setSelectedDate(day);
    onDateSelect(day);
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const gridDays = getMonthDaysGrid(currentDate);

  // Today's date for comparison
  const today = new Date();
  const isToday = (day: CalendarDate) =>
    day.date === today.getDate() &&
    day.month === today.getMonth() &&
    day.year === today.getFullYear();

  const isPastDate = (day: CalendarDate) => {
    const dayDate = new Date(day.year, day.month, day.date);
    return dayDate < today;
  };

  return (
    <div className="bg-black rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-white hover:text-indigo-300 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-white font-semibold text-lg">
          {monthName} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-white hover:text-indigo-300 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-white text-sm font-medium py-2"
          >
            {day}
          </div>
        ))}
        {gridDays.map((day, index) => {
          const isSelected =
            selectedDate?.date === day.date &&
            selectedDate?.month === day.month &&
            selectedDate?.year === day.year;

          const todayClass = isToday(day)
            ? "bg-green-500 text-white"
            : "";
          const pastDateClass = isPastDate(day) && day.isCurrentMonth
            ? "text-gray-500"
            : "";

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center p-2 rounded-lg transition-all
                ${day.isCurrentMonth ? "hover:bg-indigo-500/30" : "text-gray-400"}
                ${isSelected ? "bg-indigo-600/80 text-white" : ""}
                ${todayClass}
                ${pastDateClass}
                ${day.isCurrentMonth ? "cursor-pointer" : "cursor-default"}`}
            >
              {day.date}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
