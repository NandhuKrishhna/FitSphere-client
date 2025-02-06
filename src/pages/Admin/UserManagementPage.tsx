import type React from "react"
import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { useGetAllUsersQuery } from "../../redux/api/adminApi"
import UserManagementSkeleton from "../../components/skeleton/UserManagementSkeleton"
import Sidebar from "../../components/Sidebar"

interface User {
  id: string
  email: string
  name: string
  status: "active" | "blocked"
  premium: "yes" | "no"
}

const UserManagementDashboard: React.FC = () => {
  const [expanded, setExpanded] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "blocked">("all")
  const [premiumFilter, setPremiumFilter] = useState<"all" | "yes" | "no">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const { data, isLoading, isError } = useGetAllUsersQuery({})

  const userData: User[] = useMemo(() => {
    if (!data?.users) return []
    return data.users.map((user: any) => ({
      id: user._id,
      email: user.email,
      name: user.name,
      status: user.status === "active" ? "active" : "blocked",
      premium: user.isPremium ? "yes" : "no",
    }))
  }, [data])

  const filteredUsers = useMemo(() => {
    return userData.filter(
      (user) =>
        (searchTerm === "" ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || user.status === statusFilter) &&
        (premiumFilter === "all" || user.premium === premiumFilter),
    )
  }, [userData, searchTerm, statusFilter, premiumFilter])

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredUsers, currentPage])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  if (isLoading) return <UserManagementSkeleton />
  if (isError) return <div className="flex justify-center items-center h-screen text-white">Error fetching data</div>

  return (
    <div className="flex min-h-screen bg-[#1a1b1e]">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <div className="flex-grow p-6 bg-gradient-to-br from-[#1a1b1e] to-[#141517]">
        <div className="bg-[#25262b] rounded-xl shadow-lg p-8 transition-all duration-200">
          <h1 className="text-3xl font-bold mb-8 text-white tracking-tight">User Management</h1>

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
              value={premiumFilter}
              onChange={(e) => setPremiumFilter(e.target.value as "all" | "yes" | "no")}
              className="p-3 rounded-lg bg-[#2c2d32] border border-[#3a3b40] text-white focus:outline-none focus:border-[#6366f1] transition-colors duration-200"
            >
              <option value="all">All Accounts</option>
              <option value="yes">Premium</option>
              <option value="no">Standard</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#3a3b40]">
            <table className="w-full border-collapse">
              <thead className="bg-[#2c2d32]">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Email</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-300">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3a3b40]">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="transition-colors duration-150 hover:bg-[#2c2d32]">
                    <td className="p-4 text-white">{user.name}</td>
                    <td className="p-4 text-gray-300">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
                        `}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${
                            user.premium === "yes" ? "bg-purple-500/20 text-purple-400" : "bg-gray-500/20 text-gray-400"
                          }
                        `}
                      >
                        {user.premium === "yes" ? "Premium" : "Standard"}
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

export default UserManagementDashboard

