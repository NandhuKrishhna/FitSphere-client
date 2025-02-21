import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Search, MessageCircle, Bell } from "lucide-react";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useLogout } from "@/hooks/userLogoutHook";
import { AvatarDropdown } from "./App/DropDown";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Header({ value, onChange }: Props) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { handleLogout, isLoading } = useLogout();
  const user = useSelector(selectCurrentUser);

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
              { name: "Doctors", path: "/doctors/all" },
              { name: "Profile", path: "/profile" },
              { name: "Wallet", path: "/wallet" },
              { name: "Appointments", path: "/appointments" },
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
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Search"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="w-6 h-6" />
              </motion.button>
              <motion.div
                initial={false}
                animate={
                  isSearchVisible
                    ? { opacity: 1, y: 0, pointerEvents: "auto" }
                    : { opacity: 0, y: -10, pointerEvents: "none" }
                }
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2 text-sm text-white bg-purple-800/50 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </motion.div>
            </div>

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
                handleLogout={(e: React.FormEvent) => handleLogout(e)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
