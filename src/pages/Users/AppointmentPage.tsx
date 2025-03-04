import React from "react";
import { Video, Calendar, Clock, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Header from "../../components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentListProps } from "@/utils/Appointment";
import { Appointment } from "@/types/appointmentList";
import { AppointmentSkeleton } from "../../components/skeleton/AppointmentList";
import { formatDate, formatToIndianTime } from "@/utils/useTimeFormatter";
import { useAppointmentData } from "@/hooks/App/useAppointmentData";
import { useAppointmentActions } from "@/hooks/App/useAppointmentActions";
import Dropdown from "../../components/Doctor/DrpDown";
import AppointmentDetailsDialog from "../../components/App/AppointmentDetailDialog";
const AppointmentPage: React.FC<AppointmentListProps> = () => {
  const {
    isLoading,
    currentItems,
    totalPages,
    currentPage,
    setCurrentPage,
    setItemsPerPage,
    sortField,
    sortDirection,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    handleSort,
    processedAppointments,
    indexOfLastItem,
    indexOfFirstItem,
  } = useAppointmentData();
  console.log(currentItems);
  const { selectedAppointment, isDialogOpen, setIsDialogOpen, handleCancelAppointment, openDetailsDialog } =
    useAppointmentActions();
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-indigo-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
              <Video className="w-6 h-6 text-blue-600" />
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by doctor name"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-48">
                  <Dropdown
                    title="Filter by status"
                    options={[
                      { label: "All Statuses", value: "all" },
                      { label: "Scheduled", value: "scheduled" },
                      { label: "Completed", value: "completed" },
                      { label: "Cancelled", value: "cancelled" },
                    ]}
                    onChange={setStatusFilter}
                  />
                </div>
                <div className="w-32">
                  <Dropdown
                    title="Page"
                    options={[
                      { label: "5 per page", value: "5" },
                      { label: "10 per page", value: "10" },
                      { label: "15 per page", value: "15" },
                    ]}
                    onChange={(value) => setItemsPerPage(parseInt(value))}
                    className="w-28"
                  />
                </div>
              </div>
            </div>

            {/* Sorting Headers */}
            <div className="hidden md:grid grid-cols-12 bg-violet-300 p-4 rounded-t-lg font-medium text-gray-700 mb-2">
              <div className="col-span-4">
                <button onClick={() => handleSort("doctor")} className="flex items-center gap-1 hover:text-blue-600">
                  Doctor {renderSortIcon("doctor")}
                </button>
              </div>
              <div className="col-span-3">
                <button onClick={() => handleSort("date")} className="flex items-center gap-1 hover:text-blue-600">
                  Date & Time {renderSortIcon("date")}
                </button>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => handleSort("consultationType")}
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  Type {renderSortIcon("consultationType")}
                </button>
              </div>
              <div className="col-span-1">
                <button onClick={() => handleSort("amount")} className="flex items-center gap-1 hover:text-blue-600">
                  Fee {renderSortIcon("amount")}
                </button>
              </div>
              <div className="col-span-1 text-center">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 hover:text-blue-600 mx-auto"
                >
                  Status {renderSortIcon("status")}
                </button>
              </div>
              <div className="col-span-1 text-center">Actions</div>
            </div>

            {isLoading ? (
              <AppointmentSkeleton />
            ) : !processedAppointments.length ? (
              <p className="text-gray-500 text-center py-8">No appointments found that match your criteria.</p>
            ) : (
              <div className="space-y-4">
                {currentItems.map((appointment: Appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-indigo-200 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Doctor Info */}
                      <div className="md:col-span-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={appointment.doctor.profilePicture || "/placeholder.svg"}
                            alt={appointment.doctor.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                          />
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{appointment.doctor.name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex flex-col space-y-1">
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

                      <div className="md:col-span-2">
                        <div className="flex items-center">
                          <Video className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm text-gray-700 capitalize">{appointment.consultationType}</span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="md:col-span-1">
                        <span className="font-medium">₹{appointment.amount}</span>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-1 flex justify-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            appointment.status === "scheduled"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-1 flex justify-end md:justify-center">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => openDetailsDialog(appointment)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            aria-label="View appointment details"
                          >
                            <Info className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {processedAppointments.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, processedAppointments.length)} of{" "}
                  {processedAppointments.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AppointmentDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        appointment={selectedAppointment}
        onCancel={handleCancelAppointment}
        formatDate={formatDate}
        formatToIndianTime={formatToIndianTime}
      />
    </div>
  );
};

export default AppointmentPage;
