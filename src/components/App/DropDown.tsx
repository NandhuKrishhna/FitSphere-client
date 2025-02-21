import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { LogOut, Settings, UserCircle, CreditCard, Calendar, MessageSquare, Wallet, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Auth_User } from "@/types/authentication.type";

type AvatarDropdownProps = {
  user: Auth_User | null;
  handleLogout: (e: React.MouseEvent) => void;
  isLoading: boolean;
};

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ user, handleLogout, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95, transition: { type: "spring", stiffness: 300, damping: 30 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Define menu items based on user role
  const menuItems =
    user?.role === "doctor"
      ? [
          { icon: Calendar, label: "Appointments", path: "/doctor/appointments" },
          { icon: Clock, label: "Slots", path: "/doctor/dashboard" },
          { icon: MessageSquare, label: "Chat", path: "/doctor/chat" },
          { icon: Wallet, label: "Wallet", path: "/doctor/wallet" },
        ]
      : [
          { icon: UserCircle, label: "Profile", path: "/profile" },
          { icon: Settings, label: "Account settings", path: "/settings" },
          { icon: CreditCard, label: "Billing", path: "/billing" },
          { icon: Calendar, label: "Appointments", path: "/appointments" },
        ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-3 focus:outline-none"
        onClick={toggleDropdown}
      >
        <Avatar className="w-10 h-10 border-2 border-purple-400">
          <AvatarImage src={user?.profilePicture} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <nav className="space-y-1 p-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md transition-colors duration-150 ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-purple-500" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-2 border-t border-gray-200">
              <motion.div variants={itemVariants}>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  {isLoading ? <span className="loading loading-ring loading-md"></span> : "Log out"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
