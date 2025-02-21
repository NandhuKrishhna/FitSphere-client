import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, Filter, Search } from "lucide-react"
import { useGetAllUsersQuery } from "../../redux/api/adminApi"
import Sidebar from "../../components/Sidebar"
import UserTable from "../../components/ui/UserTable"
import { UserType } from "../../types/auth.types"
import DashboardSkeleton from "../../components/skeleton/UserManagementSkeleton"

const UserManagementDashboard: React.FC = () => {
  const [expanded, setExpanded] = useState(true)
  const { data , isLoading : isUsersLoading } = useGetAllUsersQuery({})
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("All")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filterOptions = ["All", "Active", "Inactive", "Premium", "Basic"]
   console.log(data)
  useEffect(() => {
    if (data?.users) {
      let result = [...data.users]

      if (searchTerm) {
        result = result.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      if (filter !== "All") {
        result = result.filter((user) => {
          switch (filter) {
            case "Active":
              return user.isActive
            case "Inactive":
              return !user.isActive
            case "Premium":
              return user.isPremium
            case "Basic":
              return !user.isPremium
            default:
              return true
          }
        })
      }

      setFilteredUsers(result)
    }
  }, [data, searchTerm, filter])
  if(isUsersLoading){
    return <DashboardSkeleton/>
  }
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <div className="flex-1 p-6 flex flex-col">
        <p className="text-3xl font-bold p-6 text-gray-100">User Management</p>
        <div className="flex gap-6 mb-6">
          {/* First Box - Pie Chart */}
          <div className="bg-gray-800 w-1/3 rounded-lg shadow-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Field</h3>
            <div className="flex justify-center items-center h-[250px]">
              {/* Placeholder for pie chart */}
              <div className="w-48 h-48 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Second Box - Total Customers */}
          <div className="bg-gray-800 w-1/3 rounded-lg shadow-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Total Customers</h3>
            <div className="flex flex-col justify-center items-center h-[250px]">
              <p className="text-4xl font-bold mb-4 text-gray-100">12,345</p>
              <p className="text-lg text-gray-300">Premium Customers: 9000</p>
            </div>
          </div>

          {/* Third Box - Bar Chart */}
          <div className="bg-gray-800 w-1/3 rounded-lg shadow-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Customer Growth</h3>
            <div className="flex justify-center items-center h-[250px]">
              {/* Placeholder for bar chart */}
              <div className="w-full h-full bg-gray-700 flex items-end justify-around">
                <div className="w-16 bg-gray-600 h-3/4"></div>
                <div className="w-16 bg-gray-600 h-1/2"></div>
                <div className="w-16 bg-gray-600 h-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <div className="bg-gray-800 w-full rounded-lg shadow-lg h-[90vh] p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              {/* Search Bar */}
              <div className="relative w-1/4 ml-5 mt-3">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative right-7">
                <button
                  className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-600 text-gray-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Filter size={20} className="text-gray-400" />
                  {filter}
                  <ChevronDown size={20} className="text-gray-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10 border border-gray-600">
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg text-gray-200"
                        onClick={() => {
                          setFilter(option)
                          setIsDropdownOpen(false)
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <UserTable users={filteredUsers} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default UserManagementDashboard

