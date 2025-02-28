import { ChevronDown } from "lucide-react";

interface CalendarProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function Calendar({ selectedMonth }: CalendarProps) {
  const days = [
    { num: 8, day: "Sun" },
    { num: 9, day: "Mon" },
    { num: 10, day: "Tue" },
    { num: 11, day: "Wed" },
    { num: 12, day: "Thu", isSelected: true },
    { num: 13, day: "Fri" },
    { num: 14, day: "Sat" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md font-semibold">Upcoming Meetings</h2>
        <div className="relative">
          <div className="flex items-center gap-2 bg-indigo-200/80 rounded-full px-4 py-1 cursor-pointer">
            <span className="text-sm">{selectedMonth}</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center rounded-full w-12 h-12 ${
              day.isSelected ? "bg-yellow-300" : "bg-white"
            }`}
          >
            <span className="text-sm font-semibold">{day.num}</span>
            <span className="text-xs">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
