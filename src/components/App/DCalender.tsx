import * as React from "react";
import { Calendar as ShadCalendar } from '../ui/calendar'

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

const DemoCalendar: React.FC<CalendarProps> = ({ slots, onSlotClick }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedSlots, setSelectedSlots] = React.useState<Slot[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const clickedDateString = date.toISOString().split("T")[0];
    const validSlots = Array.isArray(slots.slots) ? slots.slots : [];

    const slotsForDay = validSlots.filter((slot) => {
      const slotDate = new Date(slot.date).toISOString().split("T")[0];
      return slotDate === clickedDateString && slot.status === "available";
    });

    setSelectedDate(date);
    setSelectedSlots(slotsForDay);
    setIsModalOpen(true);
  };

  return (
    <div className=" rounded-lg p-4 text-white">
      <h2 className="text-lg font-semibold mb-4">
        Select a Date to View Available Slots
      </h2>
      <ShadCalendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border shadow bg-gray-900 text-white"
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-4 rounded-lg text-white w-96">
            <h3 className="text-lg font-semibold mb-2">
              Slots for {selectedDate?.toISOString().split("T")[0]}
            </h3>
            {selectedSlots.length > 0 ? (
              <ul>
                {selectedSlots.map((slot) => (
                  <li
                    key={slot._id}
                    className="mb-1 cursor-pointer hover:text-purple-300"
                    onClick={() => {
                      onSlotClick(slot);
                      setIsModalOpen(false);
                    }}
                  >
                    {new Date(slot.startTime).toLocaleTimeString("en-US", {
                      timeZone: "UTC",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(slot.endTime).toLocaleTimeString("en-US", {
                      timeZone: "UTC",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    ({slot.consultationType})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No available slots for this date. 😓</p>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-purple-500 hover:bg-red-400 px-2 py-1 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoCalendar;
