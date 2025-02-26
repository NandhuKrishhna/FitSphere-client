import React, { useState, useEffect } from "react";
import {
  Video,
  Calendar,
  Clock,
  X,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useCancelAppointmentMutation, useGetAppointmentDetailsQuery } from "../../redux/api/appApi";
import toast from "react-hot-toast";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useSelector } from "react-redux";
import Header from "../Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentListProps } from "@/utils/Appointment";

// Complete Appointment Interface
interface Doctor {
  name: string;
  profilePicture: string;
}

interface Slots {
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  consultationType: "video" | "in-person";
  date: string;
  doctor: Doctor;
  status: "scheduled" | "completed" | "cancelled";
  slots: Slots;
  amount: number;
  orderId: string;
  paymentMethod: string;
  paymentThrough: string;
}

const AppointmentSkeleton = () => (
  <div className="space-y-6">
    {[1, 2].map((i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-40" />
              <div className="flex items-center space-x-4 mt-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AppointmentList: React.FC<AppointmentListProps> = () => {
  const auth = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetAppointmentDetailsQuery({ patientId: auth?._id });
  const [cancelAppointment] = useCancelAppointmentMutation();

  // State for details popup
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State for sorting
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // State for filtering
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Process appointments data
  const [processedAppointments, setProcessedAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (data?.success && data?.response) {
      let filtered = [...data.response];

      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter((appointment) => appointment.status === statusFilter);
      }

      // Apply search query (searching by doctor name)
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter((appointment) =>
          appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;
        if (sortField === "date") {
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortField === "doctor") {
          comparison = a.doctor.name.localeCompare(b.doctor.name);
        } else if (sortField === "status") {
          comparison = a.status.localeCompare(b.status);
        } else if (sortField === "amount") {
          comparison = a.amount - b.amount;
        } else if (sortField === "consultationType") {
          comparison = a.consultationType.localeCompare(b.consultationType);
        }
        return sortDirection === "asc" ? comparison : -comparison;
      });

      setProcessedAppointments(filtered);
    }
  }, [data, sortField, sortDirection, statusFilter, searchQuery]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedAppointments.length / itemsPerPage);

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

  const openDetailsDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50">
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Items per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per page</SelectItem>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="15">15 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sorting Headers */}
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 rounded-t-lg font-medium text-gray-700 mb-2">
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
                    className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
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

                      {/* Date & Time */}
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

                      {/* Consultation Type */}
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
                          <button
                            onClick={() => handleCancelAppointment(appointment._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Cancel appointment"
                            disabled={appointment.status !== "scheduled"}
                          >
                            <X className="w-5 h-5" />
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

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <img
                  src={selectedAppointment.doctor.profilePicture || "/placeholder.svg"}
                  alt={selectedAppointment.doctor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold text-xl">{selectedAppointment.doctor.name}</h3>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                      selectedAppointment.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedAppointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedAppointment.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {formatToIndianTime(selectedAppointment.slots.startTime)} -{" "}
                    {formatToIndianTime(selectedAppointment.slots.endTime)}
                  </p>
                </div>
              </div>

              <div className="py-2 border-t">
                <p className="text-sm text-gray-500 mb-1">Consultation Type</p>
                <p className="font-medium flex items-center">
                  <Video className="w-4 h-4 mr-2 text-blue-500" />
                  {selectedAppointment.consultationType}
                </p>
              </div>

              <div className="py-2 border-t">
                <p className="text-sm text-gray-500 mb-1">Payment Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-medium">₹{selectedAppointment.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Method</p>
                    <p className="font-medium capitalize">{selectedAppointment.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Through</p>
                    <p className="font-medium">{selectedAppointment.paymentThrough}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-medium text-xs overflow-hidden text-ellipsis">{selectedAppointment.orderId}</p>
                  </div>
                </div>
              </div>

              <div className="py-2 border-t">
                <p className="text-sm text-gray-500 mb-1">Appointment ID</p>
                <p className="font-medium text-xs">{selectedAppointment._id}</p>
              </div>

              {selectedAppointment.status === "scheduled" && (
                <div className="pt-4 border-t flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      handleCancelAppointment(selectedAppointment._id);
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel Appointment
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentList;
