import type React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MessageCircle, Bell } from "lucide-react";
import { AvatarDropdown } from "../App/DropDown";
import { selectCurrentDoctor } from "@/redux/slice/Auth_Slice";
import { useDoctorLogout } from "@/hooks/DoctorHooks/doctorLogoutHook";

export default function DoctorHeader() {
  const { handleDoctorLogout, isLoading } = useDoctorLogout();
  const user = useSelector(selectCurrentDoctor);

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-purple-700/50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-purple-400 font-bold text-2xl transition-colors group-hover:text-white">Fit</span>
            <span className="text-white font-bold text-2xl">Sphere</span>
            <motion.span
              className="text-purple-400 text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              •
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Appointments", path: "/doctor/appointments" },
              { name: "Slots", path: "/doctor/dashboard" },
              { name: "Chat", path: "/doctor/chat" },
              { name: "Wallet", path: "/doctor/wallet" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <Link to="/messenger" className="text-gray-300 hover:text-white transition-colors" aria-label="Chat">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <MessageCircle className="w-6 h-6" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                3
              </span>
            </motion.button>

            <div className="relative">
              <AvatarDropdown
                user={user}
                handleLogout={(e: React.FormEvent) => handleDoctorLogout(e)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
