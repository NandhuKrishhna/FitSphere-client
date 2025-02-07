
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useBlockUnblockUser from "../../hooks/Admin/Block_UnBlockUserHook";
import {  DoctorWithDetails } from "../../types/DoctorTypes";

const getInitials = (name?: string) => {
    if (!name) return ""; 
    const names = name.split(" ");
    return names
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join("");
  };

const ITEMS_PER_PAGE = 5;

const DoctorTable = ({ users }: { users: DoctorWithDetails[] }) => {
    console.log(users)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);
  const { handleBlock, handleUnblock, isBlocking, isUnblocking } =
    useBlockUnblockUser();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 mt-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-800 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Approved</th>
              <th className="p-3 text-left">Consultation Fee</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: DoctorWithDetails) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="p-3">
                  {user.doctorDetails?.profilePicture? (
                    <img
                      src={user.doctorDetails.profilePicture || "/placeholder.svg"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-600"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-700 flex items-center justify-center text-gray-200 font-semibold">
                       {user.name ? getInitials(user.name) : "N/A"}
                    </div>
                  )}
                </td>
                <td className="p-3 text-gray-300">{user.name}</td>
                <td className="p-3 text-gray-300">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isApproved
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {user.isApproved ? "Yes" : "NO"}
                  </span>
                </td>
                <td className="p-3 text-gray-300">{user.doctorDetails.consultationFees}</td>
                <td className="p-3 flex gap-2">
                  <button
                  onClick={()=>{handleBlock(user._id)}}
                    className="px-4 py-2 w-24 text-xs font-medium rounded-full 
               bg-red-500/20 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                      {isBlocking? <span className="loading loading-ring loading-md"></span>: "block"}
                  </button>
                  <button
                   onClick={()=>{handleUnblock(user._id)}}
                    className="px-4 py-2 w-24 text-xs font-medium rounded-full 
               bg-green-500/20 text-green-400 hover:bg-green-600 hover:text-white"
                  >
                    {isUnblocking? <span className="loading loading-ring loading-md"></span>: "unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Custom Pagination */}
        <div className="flex justify-between items-center mt-4 p-4 rounded-lg shadow bg-gray-800 text-gray-200">
          <div className="text-sm">
            Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of{" "}
            {users.length} entries
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-700 text-gray-300 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-gray-700 text-gray-300 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorTable;
