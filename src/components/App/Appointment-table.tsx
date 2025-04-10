import { Search, ArrowDown, ArrowUp, Calendar, Wallet, Check, Info, Video } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, } from "@/components/ui/select"
import { Pagination } from "@/components/App/TestPagination"
import { AppointmentDetailsDialog } from "./AppointmentDetailDialog"
import { formatDate, formatToIndianTime } from "@/utils/useTimeFormatter"
import { IGetAppointment } from "@/types/api/appointment-api-types"
import { useAppointments } from "@/hooks/App/useAppointment"
import { Roles } from '@/utils/Enums'
import { TableSkeleton } from '../skeleton/TableSkeleton'



export default function AppointmentTable() {
  const {
    role,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentStatusFilter,
    setPaymentStatusFilter,
    consultationTypeFilter,
    setConsultationTypeFilter,
    currentPage,
    setCurrentPage,
    sortConfig,
    requestSort,
    selectedAppointment,
    isModalOpen,
    setIsModalOpen,
    appointments,
    totalPages,
    totalItems,
    isLoading,
    isFetching,
    error,
    handleViewDetails,
    queryParams
  } = useAppointments()


  return (
    <>
      <Card className="w-full bg-zinc-900 text-white border-gray-800">
        <CardHeader className="pb-2 border-b border-gray-800">
          <CardTitle className="text-2xl font-bold">Appointments</CardTitle>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Select
                value={consultationTypeFilter}
                onValueChange={(value) => {
                  setConsultationTypeFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-[150px] bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Type</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-indigo-300">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-indigo-300">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={paymentStatusFilter}
                onValueChange={(value) => {
                  setPaymentStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Payment Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-indigo-300">
                  <SelectItem value="all">All Payment Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800 overflow-hidden bg-gray-900">
            <div className="overflow-x-auto">
              {isLoading ? (
                <TableSkeleton />
              ) : error ? (
                <div className="p-8 text-center text-red-400">Error loading appointments. Please try again.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("date")}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Date
                          {sortConfig.key === "date" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center">
                          {role === Roles.USER ? "Doctors" : "Patient"}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("consultationType")}>
                          Type
                          {sortConfig.key === "consultationType" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("slot.startTime")}>
                          Time Slot
                          {sortConfig.key === "slot.startTime" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("amount")}>
                          Amount
                          {sortConfig.key === "amount" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("paymentStatus")}>
                          Payment Status
                          {sortConfig.key === "paymentStatus" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("status")}>
                          Status
                          {sortConfig.key === "status" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appointment: IGetAppointment) => (
                        <tr
                          key={appointment._id}
                          className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-gray-300">{formatDate(appointment.date)}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                <img
                                  src={appointment.otherUser.profilePicture || "/placeholder.svg"}
                                  alt="Profile"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="truncate max-w-[120px]">{appointment.otherUser.name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm capitalize text-gray-300">{appointment.consultationType}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {appointment?.slot?.startTime && appointment?.slot?.endTime
                              ? `${formatToIndianTime(appointment.slot.startTime)} - ${formatToIndianTime(appointment.slot.endTime)}`
                              : "Time Not Available"}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            <span className="text-indigo-400">₹{appointment.amount.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${appointment.paymentStatus === "completed"
                                ? "bg-green-900/20 text-green-400"
                                : appointment.paymentStatus === "pending"
                                  ? "bg-yellow-900/20 text-yellow-400"
                                  : "bg-red-900/20 text-red-400"
                                }`}
                            >
                              {appointment.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${appointment.status === "scheduled"
                                ? "bg-blue-900/20 text-blue-400"
                                : appointment.status === "completed"
                                  ? "bg-green-900/20 text-green-400"
                                  : appointment.status === "failed"
                                    ? "bg-red-900/20 text-red-400"
                                    : "bg-orange-900/20 text-orange-400"
                                }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(appointment)}
                              className="text-indigo-400 hover:text-indigo-300 hover:bg-gray-700"
                            >
                              <Info className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                          No appointments found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 sm:mb-0">
              Showing {appointments.length} of {totalItems} appointments
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isLoading={isFetching}
            />
          </div>
        </CardContent>
      </Card>

      {selectedAppointment && (
        <AppointmentDetailsDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          appointment={selectedAppointment}
          role={role}
          query={queryParams}
        />
      )}
    </>
  )
}
