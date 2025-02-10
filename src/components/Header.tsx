import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/userLogoutHook"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { LogOut } from "lucide-react"

type Props ={
  value? : string,
  onChange? : (e : React.ChangeEvent<HTMLInputElement>) => void
}

export default function Header({value, onChange}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const { handleLogout, isLoading } = useLogout()
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const user = useSelector((state: RootState) => state.auth.user)
  return (
    <header className="bg-[#0a0a14] border-b border-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-purple-500 font-bold text-2xl">Fit</span>
            <span className="text-white font-bold text-2xl">Sphere</span>
            <span className="text-purple-500 text-2xl">•</span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <Link to="/dashboard" className="text-white hover:text-purple-400 transition-colors">
              Dashboard
            </Link> */}
            {/* <Link to="/recipes" className="text-white hover:text-purple-400 transition-colors">
              Recipes
            </Link> */}
            <Link to="/doctors/all" className="text-white hover:text-purple-400 transition-colors">
              Doctors
            </Link>
            <Link to="/profile" className="text-white hover:text-purple-400 transition-colors">
              Profile
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex  items-center space-x-4">
            {/* Search Icon and Input */}
            <div className="relative mt-2">
              <button
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="Search"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full px-4 py-2 text-sm text-white bg-[#1a1a2e] border border-[#2a2a3e] rounded-md focus:outline-none focus:border-purple-500 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Support Icon */}
            <button className="text-white hover:text-purple-400 transition-colors" aria-label="Support">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Notification Bell */}
            <button className="text-white hover:text-purple-400 transition-colors" aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Cart Icon */}
            <button className="text-white hover:text-purple-400 transition-colors" aria-label="Shopping Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 004 0z"
                />
              </svg>
            </button>

            {/* Settings Icon */}
            <button className="text-white hover:text-purple-400 transition-colors" aria-label="Settings">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {user && user.profilePic ? (
                  <img
                    src={user.profilePic || "/placeholder.svg"}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full flex items-center justify-center">
                      <span>{user && user.name ? user.name.slice(0, 2).toUpperCase() : "GU"}</span>
                    </div>
                  </div>
                )}
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-5 w-[10rem]  bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <button
                    onClick={(e: React.FormEvent) => {
                      handleLogout(e)
                      setIsDropdownOpen(false)
                    }}
                    className="block px-1 py-1 text-lg font-bold text-center text-gray-700 w-full "
                    role="menuitem"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-white">
                        <LogOut />
                        <span>Logout</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

