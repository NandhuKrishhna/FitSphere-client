import { Link, useLocation } from "react-router-dom";
import { BriefcaseMedical, CalendarClock, ClipboardList, House, LayoutList, MessageCircle, Video, Wallet, Users, Bell, UserCog, Logs, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";

export default function Navigation() {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  const getLinkClass = (path: string) => (location.pathname === path ? "text-purple-400" : "text-gray-500");

  // Admin navigation links
  if (user?.role === "admin") {
    return (
      <nav className="flex justify-around py-2 border-b border-gray-800 bg-[#1e1e30]">
        <Link
          to="/admin/dashboard"
          className={`flex flex-col items-center p-2 ${getLinkClass("/admin/dashboard")}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>

        <Link
          to="/admin/users-management"
          className={`flex flex-col items-center p-2 ${getLinkClass("/admin/users-management")}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs mt-1">Users</span>
        </Link>

        <Link
          to="/admin/doctors-management"
          className={`flex flex-col items-center p-2 ${getLinkClass("/admin/doctors-management")}`}
        >
          <UserCog className="w-5 h-5" />
          <span className="text-xs mt-1">Doctors</span>
        </Link>


        <Link
          to="/admin/notifications"
          className={`flex flex-col items-center p-2 ${getLinkClass("/admin/notifications")}`}
        >
          <Bell className="w-5 h-5" />
          <span className="text-xs mt-1">Notifications</span>
        </Link>
        <Link
          to="/admin/subscription-management"
          className={`flex flex-col items-center p-2 ${getLinkClass("/admin/subscription-management")}`}
        >
          <Logs className="w-5 h-5" />
          <span className="text-xs mt-1">Subscription</span>
        </Link>

      </nav>
    );
  }

  // Doctor navigation links
  if (user?.role === "doctor") {
    return (
      <nav className="flex justify-around py-2 border-b border-gray-800 bg-[#1e1e30]">
        <Link
          to="/doctor/dashboard"
          className={`flex flex-col items-center p-2 ${getLinkClass("/doctor/dashboard")}`}
        >
          <House className="w-5 h-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>

        <Link
          to="/doctor/appointments"
          className={`flex flex-col items-center p-2 ${getLinkClass("/doctor/appointments")}`}
        >
          <CalendarClock className="w-5 h-5" />
          <span className="text-xs mt-1">Appointments</span>
        </Link>

        <Link
          to="/doctor/chat"
          className={`flex flex-col items-center p-2 ${getLinkClass("/doctor/chat")}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs mt-1">Chat</span>
        </Link>

        <Link
          to="/doctor/wallet"
          className={`flex flex-col items-center p-2 ${getLinkClass("/doctor/wallet")}`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-xs mt-1">Wallet</span>
        </Link>

        <Link
          to="/doctor/create-meet"
          className={`flex flex-col items-center p-2 ${getLinkClass("/doctor/create-meet")}`}
        >
          <Video className="w-5 h-5" />
          <span className="text-xs mt-1">Meet</span>
        </Link>

        <Link
          to="/doctor/transactions"
          className={`flex flex-col items-center p-2 ${getLinkClass("/doctor/transactions")}`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-xs mt-1">Transaction</span>
        </Link>
      </nav>
    );
  }

  // Default user navigation links
  return (
    <nav className="flex justify-around py-2 border-b border-gray-800 bg-[#1e1e30]">
      <Link
        to="/home"
        className={`flex flex-col items-center p-2 ${getLinkClass("/home")}`}
      >
        <House className="w-5 h-5" />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        to="/doctors/all"
        className={`flex flex-col items-center p-2 ${getLinkClass("/doctors/all")}`}
      >
        <BriefcaseMedical className="w-5 h-5" />
        <span className="text-xs mt-1">Doctors</span>
      </Link>

      <Link
        to="/chat"
        className={`flex flex-col items-center p-2 ${getLinkClass("/chat")}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs mt-1">Chat</span>
      </Link>

      <Link
        to="/wallet"
        className={`flex flex-col items-center p-2 ${getLinkClass("/wallet")}`}
      >
        <Wallet className="w-5 h-5" />
        <span className="text-xs mt-1">Wallet</span>
      </Link>

      <Link
        to="/create-meet"
        className={`flex flex-col items-center p-2 ${getLinkClass("/create-meet")}`}
      >
        <Video className="w-5 h-5" />
        <span className="text-xs mt-1">Meet</span>
      </Link>

      <Link
        to="/appointments"
        className={`flex flex-col items-center p-2 ${getLinkClass("/appointments")}`}
      >
        <LayoutList className="w-5 h-5" />
        <span className="text-xs mt-1">Appointments</span>
      </Link>
      {/* 
      <Link
        to="/transactions"
        className={`flex flex-col items-center p-2 ${getLinkClass("/transactions")}`}
      >
        <ClipboardList className="w-5 h-5" />
        <span className="text-xs mt-1">Transaction</span>
      </Link> */}
    </nav>
  );
}