import { useGetAllAppointmentsQuery } from "../../redux/api/doctorApi";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Info, Search, Filter, ArrowUpDown, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Appointment, Meta } from "@/types/doctorAppoitment.types";
import useHandleJoinMeeting from "@/hooks/App/useJoinMeeting";

const AppointmentTable = () => {
  const { isJoiningMeeting, handleJoinMeet } = useHandleJoinMeeting();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [sortField, setSortField] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [searchInput, setSearchInput] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError } = useGetAllAppointmentsQuery({
    page,
    limit,
    search,
    status,
    sortField,
    sortOrder,
  });

  const appointments: Appointment[] = data?.data || [];
  const meta: Meta = data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

  const handleOpenDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleStatusFilter = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatTime = (timeString: string): string => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isError) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg">
          Failed to fetch appointment data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search patient name..."
            className="pl-10 bg-gray-800 border-gray-700"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-800 border-gray-700">
                <Filter className="mr-2" size={16} />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-gray-700">
              <DropdownMenuItem onClick={() => handleStatusFilter("")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("scheduled")}>Scheduled</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("completed")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-800 border-gray-700">
                {limit} per page
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-gray-700">
              <DropdownMenuItem
                onClick={() => {
                  setLimit(5);
                  setPage(1);
                }}
              >
                5 per page
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(10);
                  setPage(1);
                }}
              >
                10 per page
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(20);
                  setPage(1);
                }}
              >
                20 per page
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(50);
                  setPage(1);
                }}
              >
                50 per page
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {(status || search) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {status && (
            <Badge variant="outline" className="bg-gray-800 text-white">
              Status: {status}
              <button className="ml-2 text-gray-400 hover:text-white" onClick={() => setStatus("")}>
                <X size={14} />
              </button>
            </Badge>
          )}
          {search && (
            <Badge variant="outline" className="bg-gray-800 text-white">
              Search: {search}
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                }}
              >
                <X size={14} />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <button
                  className="flex items-center space-x-1 focus:outline-none"
                  onClick={() => handleSort("consultationType")}
                >
                  <span>Type</span>
                  <ArrowUpDown
                    size={14}
                    className={sortField === "consultationType" ? "text-purple-400" : "text-gray-500"}
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <button className="flex items-center space-x-1 focus:outline-none" onClick={() => handleSort("date")}>
                  <span>Date & Time</span>
                  <ArrowUpDown size={14} className={sortField === "date" ? "text-purple-400" : "text-gray-500"} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <button className="flex items-center space-x-1 focus:outline-none" onClick={() => handleSort("amount")}>
                  <span>Payment</span>
                  <ArrowUpDown size={14} className={sortField === "amount" ? "text-purple-400" : "text-gray-500"} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <button className="flex items-center space-x-1 focus:outline-none" onClick={() => handleSort("status")}>
                  <span>Status</span>
                  <ArrowUpDown size={14} className={sortField === "status" ? "text-purple-400" : "text-gray-500"} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {isLoading ? (
              Array(limit)
                .fill(0)
                .map((_, index) => (
                  <tr key={`skeleton-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Skeleton className="w-10 h-10 rounded-full mr-3" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </td>
                  </tr>
                ))
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                  No appointments found
                  {(search || status) && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        className="text-sm"
                        onClick={() => {
                          setSearch("");
                          setSearchInput("");
                          setStatus("");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={appointment.patient?.profilePicture || "/placeholder.svg?height=40&width=40"}
                        alt={appointment.patient?.name || "Patient"}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{appointment.patient?.name}</p>
                        <p className="text-xs text-gray-400">{appointment.patient?.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300 capitalize">{appointment.consultationType}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-white">{new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">
                        {appointment.slot?.startTime && (
                          <>
                            {new Date(appointment.slot.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(appointment.slot.endTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </>
                        )}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${appointment.paymentStatus === "completed" ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {appointment.paymentStatus} (₹{appointment.amount})
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === "cancelled"
                          ? "bg-red-900/30 text-red-400"
                          : appointment.status === "completed"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenDetails(appointment)}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      aria-label="View details"
                    >
                      <Info size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && meta.totalPages > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2 gap-4">
          <div className="text-sm text-gray-400">
            Showing {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}-
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} appointments
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setPage(page - 1)}
                className={`px-3 py-1 rounded-md ${page === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                let pageNum;
                if (meta.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                  if (i === 4) pageNum = meta.totalPages;
                } else if (page >= meta.totalPages - 2) {
                  pageNum = i === 0 ? 1 : meta.totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded-md ${page === pageNum ? "bg-purple-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={page === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setPage(page + 1)}
                className={`px-3 py-1 rounded-md ${page === meta.totalPages
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                disabled={page === meta.totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {meta.totalPages > 5 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Go to:</span>
                <select
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 text-white rounded-md px-2 py-1 text-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  {Array.from({ length: meta.totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="bg-purple-600 p-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Appointment Details</h2>
              <button onClick={handleCloseModal} className="text-white hover:text-gray-200" aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-start relative">
                <div className="mr-4">
                  <img
                    src={selectedAppointment.patient?.profilePicture || "/placeholder.svg?height=80&width=80"}
                    alt="Patient"
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-500"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedAppointment.patient?.name}</h3>
                  <p className="text-gray-400">{selectedAppointment.patient?.email}</p>
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${selectedAppointment.status === "cancelled"
                          ? "bg-red-900/30 text-red-300"
                          : selectedAppointment.status === "completed"
                            ? "bg-green-900/30 text-green-300"
                            : "bg-yellow-900/30 text-yellow-300"
                        }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>
                <div className="absolute right-0 ">
                  <Badge
                    onClick={() => {
                      handleJoinMeet(selectedAppointment.meetingId);
                    }}
                    className="px-2 py-1.5 bg-green-400 hover:bg-green-500 cursor-pointer"
                  >
                    {isJoiningMeeting ? <Loader className=" animate-spin mx-auto" size={15} /> : "Join Now"}
                  </Badge>
                  <p className="text-sm italic text-purple-300 mt-2">
                    Join the meet on {formatTime(selectedAppointment.slot.startTime)}{" "}
                  </p>
                </div>
              </div>
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
                      {selectedAppointment.slot?.startTime
                        ? `${formatTime(selectedAppointment.slot.startTime)} - ${formatTime(
                          selectedAppointment.slot.endTime
                        )}`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Consultation Type</p>
                    <p className="text-white capitalize">{selectedAppointment.consultationType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Meeting ID</p>
                    <p className="text-white text-sm">{selectedAppointment.meetingId}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-purple-400 font-semibold mb-3 uppercase text-sm">Payment Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white font-bold">₹{selectedAppointment.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p
                      className={`font-semibold ${selectedAppointment.paymentStatus === "completed" ? "text-green-400" : "text-red-400"
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
