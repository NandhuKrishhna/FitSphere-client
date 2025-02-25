import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bell, Calendar, Search, Settings, User } from "lucide-react";

import { AvatarDropdown } from "../App/DropDown";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useDoctorLogout } from "@/hooks/DoctorHooks/doctorLogoutHook";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";

export default function DoctorHeader() {
  const { handleDoctorLogout, isLoading } = useDoctorLogout();
  const user = useSelector(selectCurrentUser);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-purple-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-purple-400 font-bold text-2xl transition-colors group-hover:text-white">Fit</span>
            <span className="text-white font-bold text-2xl">Sphere</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Appointments", path: "/doctor/appointments", icon: Calendar },
              { name: "Slots", path: "/doctor/dashboard", icon: Calendar },
              { name: "Chat", path: "/doctor/chat", icon: Bell },
              { name: "Wallet", path: "/doctor/wallet", icon: User },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white transition-colors relative group flex items-center gap-1.5"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-indigo-300">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-purple-600">
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                          <AvatarFallback>P{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Patient {i}</span> booked an appointment
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Today at 10:0{i} AM</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-purple-600">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>

            <div className="relative">
              <AvatarDropdown
                user={user}
                handleLogout={(e: React.FormEvent) => handleDoctorLogout(e)}
                isLoading={isLoading}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-purple-700/50">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search appointments, patients..."
                className="pl-10 bg-purple-800/30 border-purple-700 text-white placeholder:text-gray-300 focus-visible:ring-purple-500"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              {[
                { name: "Appointments", path: "/doctor/appointments", icon: Calendar },
                { name: "Slots", path: "/doctor/dashboard", icon: Calendar },
                { name: "Chat", path: "/doctor/chat", icon: Bell },
                { name: "Wallet", path: "/doctor/wallet", icon: User },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-purple-800/30 flex items-center gap-3"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
