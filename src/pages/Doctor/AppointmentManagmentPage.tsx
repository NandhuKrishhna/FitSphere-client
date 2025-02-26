import { useSelector } from "react-redux";
import { useGetAllAppointmentsQuery } from "../../redux/api/doctorApi";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Define interfaces for type safety
interface PatientDetails {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  createdAt: string;
  isActive: boolean;
  isPremium: boolean;
  isVerfied: boolean;
  role: string;
  status: string;
  updatedAt: string;
}

interface SlotDetails {
  _id: string;
  consultationType: string;
  createdAt: string;
  date: string;
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  status: string;
  updatedAt: string;
}

interface Appointment {
  _id: string;
  amount: number;
  bank?: string;
  consultationType: string;
  createdAt: string;
  date: string;
  description: string;
  doctorId: string;
  orderId: string;
  patientDetails: PatientDetails;
  patientId: string;
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentThrough: string;
  slotDetails: SlotDetails;
  slotId: string;
  status: string;
  updatedAt: string;
}

const AppointmentTable = () => {
  const doctor = useSelector(selectCurrentUser);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const { data, isLoading, isError } = useGetAllAppointmentsQuery({
    userId: doctor?._id,
  });

  const handleOpenDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (isError || !data?.response) {
    return <div className="text-center text-red-500">Failed to fetch data</div>;
  }

  const appointments = data.response.appointments || [];

  if (appointments.length === 0) {
    return <div className="text-center text-gray-400">No appointments found</div>;
  }

  // Format date for better display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for better display
  const formatTime = (timeString: string): string => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentAppointments.map((appointment: Appointment) => (
              <tr key={appointment._id}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img
                    src={appointment.patientDetails?.profilePicture || "/default-avatar.png"}
                    alt={appointment.patientDetails?.name || "Patient"}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{appointment.patientDetails?.name}</p>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-300">{appointment.consultationType}</span>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-300">
                    {new Date(appointment.date).toLocaleDateString()}{" "}
                    {appointment.slotDetails?.startTime
                      ? `${new Date(appointment.slotDetails.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} - ${new Date(appointment.slotDetails.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : ""}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-medium ${
                      appointment.paymentStatus === "completed" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {appointment.paymentStatus} ({appointment.amount})
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleOpenDetails(appointment)}
                    className="px-2 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-700"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-2">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, appointments.length)} of {appointments.length}{" "}
          appointments
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-purple-600 p-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Appointment Details</h2>
              <button onClick={handleCloseModal} className="text-white hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Patient Information */}
              <div className="mb-6 flex items-start">
                <div className="mr-4">
                  <img
                    src={selectedAppointment.patientDetails?.profilePicture || "/default-avatar.png"}
                    alt="Patient"
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-500"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedAppointment.patientDetails?.name}</h3>
                  <p className="text-gray-400">{selectedAppointment.patientDetails?.email}</p>
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        selectedAppointment.status === "cancelled"
                          ? "bg-red-900 text-red-300"
                          : "bg-green-900 text-green-300"
                      }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-purple-400 font-semibold mb-3 uppercase text-sm">Appointment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">{formatDate(selectedAppointment.date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="text-white">
                      {selectedAppointment.slotDetails?.startTime
                        ? `${formatTime(selectedAppointment.slotDetails.startTime)} - ${formatTime(
                            selectedAppointment.slotDetails.endTime
                          )}`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Consultation Type</p>
                    <p className="text-white capitalize">{selectedAppointment.consultationType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Slot ID</p>
                    <p className="text-white text-sm">{selectedAppointment.slotId}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-purple-400 font-semibold mb-3 uppercase text-sm">Payment Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white font-bold">${selectedAppointment.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p
                      className={`font-semibold ${
                        selectedAppointment.paymentStatus === "completed" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {selectedAppointment.paymentStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white capitalize">{selectedAppointment.paymentMethod || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Through</p>
                    <p className="text-white">{selectedAppointment.paymentThrough || "Not specified"}</p>
                  </div>
                  {selectedAppointment.bank && (
                    <div>
                      <p className="text-gray-400 text-sm">Bank</p>
                      <p className="text-white">{selectedAppointment.bank}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400 text-sm">Order ID</p>
                    <p className="text-white text-sm">{selectedAppointment.orderId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
