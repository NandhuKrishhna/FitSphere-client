import React from "react";
import { Video, Calendar, Clock, X } from "lucide-react";
import { Appointment, AppointmentListProps } from "../../utils/Appointment";
import { useCancelAppointmentMutation } from "../../redux/api/appApi";
import toast from "react-hot-toast";

const AppointmentList: React.FC<AppointmentListProps> = ({ data }) => {
  const [cancelAppointment] = useCancelAppointmentMutation();
  if (!data?.response || !data.success) {
    return null;
  }

  const formatToIndianTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await cancelAppointment({
        appointmentId: appointmentId,
      }).unwrap();
      console.log(response);
      toast.success("Appointment cancelled successfully");
      console.log("Cancelling appointment:", appointmentId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <div className="col-span-2 bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
        <Video className="w-5 h-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {data.response.map((appointment: Appointment) => (
          <div
            key={appointment._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.doctor.ProfilePicture}
                  alt={appointment.doctor.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {appointment.doctor.name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(appointment.date)}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatToIndianTime(appointment.slots.startTime)} -{" "}
                      {formatToIndianTime(appointment.slots.endTime)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === "scheduled"
                      ? "bg-yellow-100 text-yellow-800"
                      : appointment.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {appointment.status}
                </span>
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Cancel appointment"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
