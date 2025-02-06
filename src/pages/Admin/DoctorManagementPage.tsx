import type React from "react"
import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { useGetAllDoctorsQuery } from "../../redux/api/adminApi"
import UserManagementSkeleton from "../../components/skeleton/UserManagementSkeleton"
import Sidebar from "../../components/Sidebar"

interface Doctor {
  _id: string
  email: string
  name: string
  status: "active" | "blocked"
  isApproved: "Yes" | "No"
}

const DoctorManagementDashboard: React.FC = () => {
  const [expanded, setExpanded] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "blocked">("all")
  const [approvedFilter, setApprovedFilter] = useState<"all" | "yes" | "no">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const { data, isLoading, isError } = useGetAllDoctorsQuery({})
  console.log(data)

  const doctorData: Doctor[] = useMemo(() => {
    if (!data?.doctors) return []
    return data.doctors.map((doctor: Doctor) => ({
      id: doctor._id,
      email: doctor.email,
      name: doctor.name,
      status: doctor.status === "active" ? "active" : "blocked",
      isApproved: doctor.isApproved ? "Yes" : "No",  
    }))
  }, [data])

  const filteredDoctors = useMemo(() => {
    return doctorData.filter(
      (doctor) =>
        (searchTerm === "" ||
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || doctor.status === statusFilter) &&
        (approvedFilter === "all" || doctor.isApproved.toLowerCase() === approvedFilter),
    )
  }, [doctorData, searchTerm, statusFilter, approvedFilter])

  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredDoctors, currentPage])

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage)

  if (isLoading) return <UserManagementSkeleton />
  if (isError) return <div className="flex justify-center items-center h-screen text-white">Error fetching data</div>

  return (
    <div className="flex min-h-screen bg-[#1a1b1e]">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <div className="flex-grow p-6 bg-gradient-to-br from-[#1a1b1e] to-[#141517]">
        <div className="bg-[#25262b] rounded-xl shadow-lg p-8 transition-all duration-200">
          <h1 className="text-3xl font-bold mb-8 text-white tracking-tight">Doctor Management</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-[#2c2d32] border border-[#3a3b40] text-white placeholder-gray-400 focus:outline-none focus:border-[#6366f1] transition-colors duration-200"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "blocked")}
              className="p-3 rounded-lg bg-[#2c2d32] border border-[#3a3b40] text-white focus:outline-none focus:border-[#6366f1] transition-colors duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>

            <select
              value={approvedFilter}
              onChange={(e) => setApprovedFilter(e.target.value as "all" | "yes" | "no")}
              className="p-3 rounded-lg bg-[#2c2d32] border border-[#3a3b40] text-white focus:outline-none focus:border-[#6366f1] transition-colors duration-200"
            >
              <option value="all">All Doctors</option>
              <option value="yes">Approved</option>
              <option value="no">Not Approved</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#3a3b40]">
            <table className="w-full border-collapse">
              <thead className="bg-[#2c2d32]">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Email</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Approved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3a3b40]">
                {paginatedDoctors.map((doctor) => (
                  <tr key={`${doctor._id}-${doctor.email}`} className="transition-colors duration-150 hover:bg-[#2c2d32]">

                    <td className="p-4 text-white">{doctor.name}</td>
                    <td className="p-4 text-gray-300">{doctor.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${doctor.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          doctor.isApproved === "Yes" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {doctor.isApproved}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <span className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg bg-[#2c2d32] text-white border border-[#3a3b40] hover:bg-[#34353a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-lg bg-[#6366f1] text-white hover:bg-[#5558e6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorManagementDashboard
