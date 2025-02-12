import React, { useState, useEffect } from "react";

export interface Slot {
  _id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  date: string;
  consultationType: string;
  status: string;
}

interface CalendarProps {
  slots: {
    success: boolean;
    message: string;
    slots: Slot[];
  };
  onSlotClick: (slot: Slot) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  slots,
  onSlotClick,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth();
  const daysInMonth = new Date(
    Date.UTC(currentYear, currentMonth + 1, 0)
  ).getUTCDate();
  const firstDayOfMonth = new Date(
    Date.UTC(currentYear, currentMonth, 1)
  ).getUTCDay();

  const getSlotColor = (count: number) => {
    if (count === 0) return "bg-gray-600";
    if (count < 3) return "bg-red-500";
    if (count < 6) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(Date.UTC(currentYear, currentMonth, day));
    const clickedDateString = clickedDate.toISOString().split("T")[0];

    const validSlots = Array.isArray(slots.slots) ? slots.slots : [];
    const slotsForDay = validSlots.filter((slot) => {
      const slotDate = new Date(slot.date).toISOString().split("T")[0];
      return slotDate === clickedDateString;
    });

    setSelectedDate(clickedDateString);
    setSelectedSlots(slotsForDay);
    setIsModalOpen(true);
  };

  const renderCalendar = () => {
    const validSlots = Array.isArray(slots.slots) ? slots.slots : [];
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateUTC = new Date(Date.UTC(currentYear, currentMonth, day));
      const currentDateString = currentDateUTC.toISOString().split("T")[0];

      const slotsForDay = validSlots.filter((slot) => {
        const slotDate = new Date(slot.date).toISOString().split("T")[0];
        return slotDate === currentDateString;
      });

      const slotCount = slotsForDay.length;
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer 
            transition-all duration-200 ease-in-out ${getSlotColor(slotCount)}
            hover:scale-110 hover:shadow-lg hover:text-black hover:bg-indigo-400`}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setUTCMonth(newDate.getUTCMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setUTCMonth(newDate.getUTCMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-purple-400 hover:text-purple-300"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="text-purple-400 hover:text-purple-300"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-gray-400 ">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-4 rounded-lg   text-white w-96">
            <div className="ml-12">
            <h3 className="text-lg  font-semibold mb-2">
               Slots for {selectedDate}
            </h3>
            {selectedSlots.length > 0 ? (
              <ul>
                {selectedSlots.map((slot) => (
                  <li
                    key={slot._id}
                    className="mb-1 cursor-pointer  hover:text-purple-300 "
                    onClick={() => {
                      onSlotClick(slot); 
                      setIsModalOpen(false); 
                    }}
                  >
                    {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                    {new Date(slot.endTime).toLocaleTimeString()} (
                    {slot.consultationType})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No slots available for this date.😓</p>
            )}

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-purple-500 hover:bg-red-400 px-2 py-1 rounded-md"
            >
              Close
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
