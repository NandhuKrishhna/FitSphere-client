import { useSelector } from "react-redux";
import { useGetAllAppointmentsQuery } from "../../redux/api/doctorApi";
import DoctorHeader from "../../components/Doctor/DoctorHeader";
import { RootState } from "../../redux/store";

const AppointmentTable = () => {
  const doctor = useSelector((state: RootState) => state.doctor.user);

  const { data, isLoading, isError } = useGetAllAppointmentsQuery({
    userId: doctor?._id,
  });

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (isError || !data?.response) {
    return <div className="text-center text-red-500">Failed to fetch data</div>;
  }

  const appointments = data.response;

  return (
    <div className="bg-gray-900 min-h-screen">
      <DoctorHeader />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Appointments</h1>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Consultation Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {appointments.map((appointment: any) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={appointment.patientDetails.profilePicture}
                      alt={appointment.patientDetails.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {appointment.patientDetails.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {appointment.consultationType}
                    </span>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {new Date(appointment.date).toLocaleDateString()}{" "}
                      {appointment.slotDetails?.startTime
                        ? `${new Date(
                            appointment.slotDetails.startTime
                          ).toLocaleTimeString()} - ${new Date(
                            appointment.slotDetails.endTime
                          ).toLocaleTimeString()}`
                        : ""}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        appointment.paymentStatus === "completed"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {appointment.paymentStatus} ({appointment.amount})
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
