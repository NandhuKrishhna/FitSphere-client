import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { format, parseISO, isAfter, isBefore } from "date-fns";

interface Appointment {
  _id: string;
  patientName: string;
  patientProfilePic: string;
  date: string;
  startTime?: string;
  endTime?: string;
}

interface PatientListProps {
  selectedTimeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
  appointments?: Appointment[];
}

export default function PatientList({ selectedTimeFrame, onTimeFrameChange, appointments = [] }: PatientListProps) {
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const timeFrameOptions = ["Upcoming", "Past", "All"];

  useEffect(() => {
    if (!appointments.length) return;

    const now = new Date();
    let filtered = [...appointments];
    if (selectedTimeFrame === "Upcoming") {
      filtered = appointments.filter((appointment) => {
        const appointmentDate = parseISO(appointment.date);
        return isAfter(appointmentDate, now);
      });
    } else if (selectedTimeFrame === "Past") {
      filtered = appointments.filter((appointment) => {
        const appointmentDate = parseISO(appointment.date);
        return isBefore(appointmentDate, now);
      });
    }
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });

    setFilteredAppointments(filtered);
  }, [appointments, selectedTimeFrame, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const formatAppointmentTime = (appointment: Appointment) => {
    if (appointment.startTime) {
      return format(parseISO(appointment.startTime), "hh:mm a");
    }
    return "Scheduled";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-black">
        <h2 className="text-lg font-semibold">Patients</h2>
        <div className="flex gap-2">
          <div
            className="bg-gray-300 rounded-md px-3 py-1 flex text-black items-center gap-2 cursor-pointer relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-sm">{selectedTimeFrame}</span>
            <ChevronDown size={14} />

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-1 z-10">
                {timeFrameOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTimeFrameChange(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleSortOrder} className="bg-gray-300 rounded-md px-3 py-1 text-sm">
            {sortOrder === "desc" ? "↓ Date" : "↑ Date"}
          </button>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No appointments found</div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment._id} className="flex items-center gap-3">
              <img
                src={appointment.patientProfilePic || "/placeholder.svg?height=40&width=40"}
                alt={appointment.patientName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-grow text-black">
                <h3 className="text-sm font-medium">{appointment.patientName}</h3>
                <p className="text-xs text-zinc-600">{format(parseISO(appointment.date), "MMMM d, yyyy")}</p>
              </div>
              <div className="bg-green-200 text-black px-2 py-1 rounded-md text-xs">{formatAppointmentTime(appointment)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
