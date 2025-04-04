import { Search, ArrowDown, ArrowUp, UserCheck, Shield, CheckCircle, Ban, Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import Pagination from "@/components/App/Pagination"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { AvatarDemo } from "@/components/App/Avatar"
import { Doctor } from "@/types/api/admin-api-types"
import useDoctorManagement from "@/hooks/Admin/useDoctorManagement"

export default function DoctorManagement() {
  const {
    DoctorStatusBadge,
    ApprovalBadge,
    handleBlock,
    handleUnblock,
    isblocking,
    isunblocking,
    doctors,
    totalDoctors,
    totalPages,
    activeDoctors,
    pendingDoctors,
    approvedDoctors,
    chartData,
    COLORS,
    requestSort,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    verificationFilter,
    setVerificationFilter,
    approvalFilter,
    setApprovalFilter,
    currentPage,
    setCurrentPage,
    sortConfig,
    isLoading,
    error,
    queryParams
  } = useDoctorManagement();

  return (
    <div className="min-h-screen bg-slate-500">
      <Header />
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <Card className="md:col-span-1 bg-zinc-900 text-white border-gray-800">
          <CardHeader className="pb-2 border-b border-gray-800">
            <CardTitle className="text-2xl font-bold">Doctor Statistics</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 px-4 md:px-6">
            <div className="h-64 max-w-[90%] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} doctors`, null]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 max-w-[90%] mx-auto">
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Total Doctors</p>
                <p className="text-2xl font-bold text-white">{totalDoctors}</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Active Doctors</p>
                <p className="text-2xl font-bold text-green-500">{activeDoctors}</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-indigo-500">{approvedDoctors}</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-500">{pendingDoctors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-zinc-900 text-white border-gray-800">
          <CardHeader className="pb-2 border-b border-gray-800">
            <CardTitle className="text-2xl font-bold">Doctor Management</CardTitle>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
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
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-indigo-300">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={verificationFilter}
                  onValueChange={(value) => {
                    setVerificationFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                    <div className="flex items-center">
                      <UserCheck className="mr-2 h-4 w-4" />
                      <span>Verification</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-indigo-300">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={approvalFilter}
                  onValueChange={(value) => {
                    setApprovalFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Approval</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-indigo-300">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-800 overflow-hidden bg-gray-900">
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-400">Loading doctors...</div>
                ) : error ? (
                  <div className="p-8 text-center text-red-400">Error loading doctors. Please try again.</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                          <div className="flex items-center cursor-pointer" onClick={() => requestSort("name")}>
                            Name & Email
                            {sortConfig.key === "name" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                          <div className="flex items-center cursor-pointer" onClick={() => requestSort("isVerified")}>
                            Verified
                            {sortConfig.key === "isVerified" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                          <div className="flex items-center cursor-pointer" onClick={() => requestSort("isApproved")}>
                            Approval
                            {sortConfig.key === "isApproved" &&
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
                      {doctors.length > 0 ? (
                        doctors.map((doctor: Doctor) => (
                          <tr key={doctor._id} className="border-t border-gray-800 hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-300">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-700">
                                  <AvatarDemo image={doctor.profilePicture} name={doctor.name} />
                                </div>
                                <div>
                                  <div className="font-medium">{doctor.name}</div>
                                  <div className="text-gray-400 text-xs mt-1">{doctor.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">
                              {doctor.isVerified ? (
                                <span className="text-green-500 flex items-center">
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  Verified
                                </span>
                              ) : (
                                <span className="text-yellow-500 flex items-center">
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <ApprovalBadge isApproved={doctor.isApproved} />
                            </td>
                            <td className="px-4 py-3">
                              <DoctorStatusBadge status={doctor.status} />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    doctor.status === "active"
                                      ? handleBlock(doctor._id, doctor.role, queryParams)
                                      : handleUnblock(doctor._id, doctor.role, queryParams)
                                  }
                                  className={
                                    doctor.status === "active"
                                      ? "text-red-400 hover:text-red-300 hover:bg-gray-700"
                                      : "text-green-400 hover:text-green-300 hover:bg-gray-700"
                                  }
                                >
                                  {doctor.status === "active" ? (
                                    isblocking[doctor._id] ? (
                                      <Loader className="animate-spin" size={15} />
                                    ) : (
                                      <>
                                        <Ban className="h-4 w-4 mr-1" />
                                        Block
                                      </>
                                    )
                                  ) : isunblocking[doctor._id] ? (
                                    <Loader className="animate-spin" size={15} />
                                  ) : (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-1" />
                                      Unblock
                                    </>
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                            No doctors found matching your filters.
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
                Showing {doctors.length} of {totalDoctors} doctors
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}