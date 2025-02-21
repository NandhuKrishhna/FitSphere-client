import type React from "react";
import { Video, Calendar, Clock, X } from "lucide-react";
import type { Appointment, AppointmentListProps } from "../../utils/Appointment";
import { useCancelAppointmentMutation, useGetAppointmentDetailsQuery } from "../../redux/api/appApi";
import toast from "react-hot-toast";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useSelector } from "react-redux";
import Header from "../Header";
import { Skeleton } from "@/components/ui/skeleton";

const AppointmentList: React.FC<AppointmentListProps> = () => {
  const auth = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetAppointmentDetailsQuery({ patientId: auth?._id });
  const [cancelAppointment] = useCancelAppointmentMutation();

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
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
              <Video className="w-6 h-6 text-blue-600" />
            </div>

            {isLoading ? (
              <AppointmentSkeleton />
            ) : !data?.response || !data.success ? (
              <p className="text-gray-500 text-center py-4">No appointments found.</p>
            ) : (
              <div className="space-y-6">
                {data.response.map((appointment: Appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={appointment.doctor.ProfilePicture || "/placeholder.svg"}
                          alt={appointment.doctor.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div>
                          <h3 className="font-semibold text-xl text-gray-900">{appointment.doctor.name}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                              {formatDate(appointment.date)}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="w-4 h-4 mr-2 text-blue-500" />
                              {formatToIndianTime(appointment?.slots.startTime)} -{" "}
                              {formatToIndianTime(appointment?.slots.endTime)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
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
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AppointmentSkeleton = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AppointmentList;
