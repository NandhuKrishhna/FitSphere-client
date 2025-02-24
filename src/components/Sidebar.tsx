import type React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, Settings, Users, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAdminLogout } from "../hooks/Admin/adminLogoutHook";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";

const Sidebar = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isAdmin = useSelector(selectCurrentUser);

  return (
    <div
      className={`min-h-screen bg-[#25262b] border-r border-[#3a3b40] shadow-xl transition-all duration-300 ease-in-out flex flex-col ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#3a3b40]">
        {expanded && (
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            FitSphere
          </h2>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg hover:bg-[#2c2d32] text-gray-400 hover:text-white transition-colors duration-200"
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-grow py-4">
        <ul className="space-y-2 px-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2c2d32] transition-colors duration-200"
            >
              <Home size={20} />
              {expanded && <span className="ml-3 font-medium">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users-management"
              className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2c2d32] transition-colors duration-200"
            >
              <Users size={20} />
              {expanded && <span className="ml-3 font-medium">User Management</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/doctors-management"
              className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2c2d32] transition-colors duration-200"
            >
              <Users size={20} />
              {expanded && <span className="ml-3 font-medium">Doctor Management</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/notifications"
              className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2c2d32] transition-colors duration-200"
            >
              <Users size={20} />
              {expanded && <span className="ml-3 font-medium">Notification</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="flex items-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2c2d32] transition-colors duration-200"
            >
              <Settings size={20} />
              {expanded && <span className="ml-3 font-medium">Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <SidebarProfile
        user={isAdmin ?? { name: "Guest User", email: "No Email", profilePicture: "" }}
        expanded={expanded}
      />
    </div>
  );
};

export const SidebarProfile = ({
  user,
  expanded,
}: {
  user: { profilePicture?: string; name: string; email: string };
  expanded: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleLogout, isLoading } = useAdminLogout();
  const userName = user?.name || "Guest User";
  const profilePic = user?.profilePicture;
  const userEmail = user?.email || "No Email Provided";

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="border-t border-[#3a3b40] p-4">
      <div
        className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-[#2c2d32] transition-colors duration-200"
        onClick={handleOpenModal}
      >
        {/* Profile Picture or Initials */}
        {profilePic ? (
          <img
            src={profilePic}
            alt="User Avatar"
            className="rounded-full w-10 h-10 ring-2 ring-[#6366f1] ring-offset-2 ring-offset-[#25262b]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center ring-2 ring-[#6366f1] ring-offset-2 ring-offset-[#25262b]">
            <span className="text-sm font-medium text-white">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        )}

        {/* User Name & Email */}
        {expanded && (
          <div className="ml-3">
            <p className="font-medium text-white">{userName}</p>
            <p className="text-sm text-gray-400">{userEmail}</p>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-[#25262b] p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-[#3a3b40]">
            <h3 className="text-lg font-semibold text-white text-center mb-6">Are you sure you want to logout?</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-[#2c2d32] text-white hover:bg-[#34353a] border border-[#3a3b40] transition-colors duration-200"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#6366f1] text-white hover:bg-[#5558e6] transition-colors duration-200 flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
