import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/userLogoutHook";
import { useSelector } from "react-redux";
import { AvatarDropdown } from "./App/DropDown";
import { selectCurrentUser } from "../redux/slice/Auth_Slice";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Header({ value, onChange }: Props) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { handleLogout, isLoading } = useLogout();

  const user = useSelector(selectCurrentUser);
  return (
    <header className="bg-[#0a0a14] border-b border-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-purple-500 font-bold text-2xl">Fit</span>
            <span className="text-white font-bold text-2xl">Sphere</span>
            <span className="text-purple-500 text-2xl">•</span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/doctors/all" className="text-white hover:text-purple-400 transition-colors">
              Doctors
            </Link>
            <Link to="/profile" className="text-white hover:text-purple-400 transition-colors">
              Profile
            </Link>
            <Link to="/wallet" className="text-white hover:text-purple-400 transition-colors">
              Wallet
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon and Input */}
            <div className="relative mt-1 ">
              <button
                className="text-white mb-1 hover:text-purple-400 transition-colors"
                aria-label="Search"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <div
                className={`absolute right-0 mt-5 w-64 transition-all duration-300 ease-in-out ${
                  isSearchVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2  mt-5 text-sm text-white bg-[#1a1a2e] border border-[#2a2a3e] rounded-md focus:outline-none focus:border-purple-500 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Support Icon */}
            <Link to="/messenger" className="text-white hover:text-purple-400 transition-colors" aria-label="Chat">
              <button>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.634 0-3.157-.392-4.43-1.086L3 20l1.119-3.297C3.413 15.479 3 13.79 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </Link>

            {/* Notification Bell */}
            <button className="text-white hover:text-purple-400 transition-colors" aria-label="Notifications">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Avatar with Dropdown */}
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
