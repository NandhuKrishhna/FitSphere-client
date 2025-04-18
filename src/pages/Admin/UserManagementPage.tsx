import { Search, ArrowDown, ArrowUp, Shield, UserCheck, Ban, Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { AvatarDemo } from "@/components/App/Avatar"
import { UserInfo } from "@/types/userTypes"
import useUserManagement from "@/components/App/UserManagement"
import useAdminUserManagement from "@/hooks/Admin/useManagement"
import { Pagination } from "@/components/App/TestPagination"
import { TableSkeleton } from "@/components/skeleton/TableSkeleton"




export default function UserManagement() {
  const { UserRoleBadge, UserStatusBadge } = useUserManagement();
  const {
    users,
    totalUsers,
    totalPages,
    verifiedUsers,
    activeUsers,
    blockedUsers,
    chartData,
    COLORS,
    requestSort,
    handleBlock,
    handleUnblock,
    isblocking,
    isunblocking,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    verificationFilter,
    setVerificationFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    sortConfig,
    queryParams

  } = useAdminUserManagement();

  return (
    <div className="min-h-screen bg-slate-500">
      <Header />
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <Card className="md:col-span-0.5 bg-zinc-900 text-white border-gray-800">
          <CardHeader className="pb-2 border-b border-gray-800">
            <CardTitle className="text-2xl font-bold">User Statistics</CardTitle>
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
                  <Tooltip formatter={(value) => [`${value} users`, null]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 max-w-[90%] mx-auto">
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{totalUsers}</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-green-500">{activeUsers}</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Verified</p>
                <p className="text-2xl font-bold text-indigo-500">{verifiedUsers}</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-lg text-center">
                <p className="text-gray-400 text-sm">Blocked</p>
                <p className="text-2xl font-bold text-red-500">{blockedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-zinc-900 text-white border-gray-800">
          <CardHeader className="pb-2 border-b border-gray-800">
            <CardTitle className="text-2xl font-bold">User Management</CardTitle>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-800 overflow-hidden bg-gray-900">
              <div className="overflow-x-auto">
                {isLoading ? (
                  <TableSkeleton />
                ) : error ? (
                  <div className="p-8 text-center text-red-400">Error loading users. Please try again.</div>
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
                          <div className="flex items-center cursor-pointer" onClick={() => requestSort("role")}>
                            Role
                            {sortConfig.key === "role" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                          <div className="flex items-center cursor-pointer" onClick={() => requestSort("isPremium")}>
                            Premium
                            {sortConfig.key === "isPremium" &&
                              (sortConfig.direction === "asc" ? (
                                <ArrowUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                          <div className="flex items-center cursor-pointer" onClick={() => requestSort("isVerfied")}>
                            Verified
                            {sortConfig.key === "isVerfied" &&
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
                      {users.length > 0 ? (
                        users.map((user: UserInfo) => (
                          <tr key={user._id} className="border-t border-gray-800 hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-300">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-700">
                                  <AvatarDemo image={user.profilePicture} name={user.name} />
                                </div>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-xs mt-1">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <UserRoleBadge role={user.role} />
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">
                              {user.isPremium ? (
                                <span className="text-yellow-400 flex items-center">
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  Premium
                                </span>
                              ) : (
                                <span className="text-gray-400">Standard</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">
                              {user.isVerfied ? (
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
                              <UserStatusBadge status={user.status} />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  user.status === "active"
                                    ? handleBlock(user._id, user.role, queryParams)
                                    : handleUnblock(user._id, user.role, queryParams)
                                }
                                className={
                                  user.status === "active"
                                    ? "text-red-400 hover:text-red-300 hover:bg-gray-700"
                                    : "text-green-400 hover:text-green-300 hover:bg-gray-700"
                                }
                              >
                                {user.status === "active" ? (
                                  isblocking[user._id] ? (
                                    <Loader className="animate-spin" size={15} />
                                  ) : (
                                    <>
                                      <Ban className="h-4 w-4 mr-1" />
                                      Block
                                    </>
                                  )
                                ) : isunblocking[user._id] ? (
                                  <Loader className="animate-spin" size={15} />
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-1" />
                                    Unblock
                                  </>
                                )}
                              </Button>


                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                            No users found matching your filters.
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
                Showing {users.length} of {totalUsers} users
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

