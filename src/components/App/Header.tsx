"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Search, Bell, Settings, User, LogOut, X } from "lucide-react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <div className="flex items-center">
        <span className="text-xl font-bold text-purple-400">FitSphere</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          {isSearchOpen && (
            <div
              ref={searchInputRef}
              className="absolute top-full right-0 mt-2 w-64 bg-[#1e1e30] rounded-lg shadow-lg p-2 z-10 border border-gray-700"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search foods, meals..."
                  className="w-full bg-[#2a2a40] text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  autoFocus
                />
                <button className="ml-2 text-gray-400 hover:text-white" onClick={() => setIsSearchOpen(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
        <NotificationDropdown
          isOpen={isNotificationDropdownOpen}
          setIsOpen={setIsNotificationDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
          dropdownRef={notificationDropdownRef}
        />
        <button className="p-2">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
        <ProfileDropdown
          isOpen={isProfileDropdownOpen}
          setIsOpen={setIsProfileDropdownOpen}
          setIsNotificationDropdownOpen={setIsNotificationDropdownOpen}
          dropdownRef={profileDropdownRef}
        />
      </div>
    </header>
  );
}

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsProfileDropdownOpen?: (isOpen: boolean) => void;
  setIsNotificationDropdownOpen?: (isOpen: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

function NotificationDropdown({ isOpen, setIsOpen, setIsProfileDropdownOpen, dropdownRef }: DropdownProps) {
  return (
    <div className="relative">
      <button
        className="p-2 relative"
        onClick={() => {
          setIsOpen(!isOpen);
          if (setIsProfileDropdownOpen) setIsProfileDropdownOpen(false);
        }}
      >
        <Bell className="w-5 h-5 text-gray-400" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-72 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
        >
          <div className="p-3 border-b border-gray-700">
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <div className="p-3 border-b border-gray-700 hover:bg-[#2a2a40] cursor-pointer">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-bold">FS</span>
                </div>
                <div>
                  <p className="text-sm">You've reached your protein goal today! 🎉</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-b border-gray-700 hover:bg-[#2a2a40] cursor-pointer">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-bold">FS</span>
                </div>
                <div>
                  <p className="text-sm">New healthy recipes are available for you!</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
            <div className="p-3 hover:bg-[#2a2a40] cursor-pointer">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-bold">FS</span>
                </div>
                <div>
                  <p className="text-sm">Don't forget to log your dinner for yesterday!</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 text-center border-t border-gray-700">
            <button className="text-sm text-purple-400 hover:text-purple-300">View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileDropdown({ isOpen, setIsOpen, setIsNotificationDropdownOpen, dropdownRef }: DropdownProps) {
  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
        onClick={() => {
          setIsOpen(!isOpen);
          if (setIsNotificationDropdownOpen) setIsNotificationDropdownOpen(false);
        }}
      >
        <span className="text-xs font-bold">JS</span>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
        >
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                <span className="text-xs font-bold">JS</span>
              </div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center text-red-400">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
