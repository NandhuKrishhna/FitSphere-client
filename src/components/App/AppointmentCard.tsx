import React from "react";
import { Info } from "lucide-react";
import { Appointment } from "@/types/appointmentList";
import { formatDate, formatToIndianTime } from "@/utils/useTimeFormatter";

interface AppointmentCardProps {
  appointment: Appointment;
  openDetailsDialog: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, openDetailsDialog }) => {
  return (
    <div className="bg-indigo-200 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4">{appointment.doctor.name}</div>
        <div className="col-span-3">
          {formatDate(appointment.date)} - {formatToIndianTime(appointment?.slots.startTime)}
        </div>
        <div className="col-span-2">{appointment.consultationType}</div>
        <div className="col-span-1">{appointment.amount}</div>
        <div className="col-span-1">{appointment.status}</div>
        <div className="col-span-1">
          <button onClick={() => openDetailsDialog(appointment)}>
            <Info />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
