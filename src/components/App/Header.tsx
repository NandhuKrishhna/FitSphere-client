import { useLogout } from "@/hooks/userLogoutHook";
import { useGetAllNotificationQuery } from "@/redux/api/appApi";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Props } from "@/types/userTypes";
import { Roles } from "@/utils/Enums";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationDropdown } from "./NotificatoinDropDown";



export default function Header({ value, onChange }: Props) {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { handleLogout, isLoading } = useLogout();
  const location = useLocation();
  const { data: notificationsResponse } = useGetAllNotificationQuery(
    {},
    { skip: user?.role === Roles.ADMIN }
  );

  const notifications = user?.role !== Roles.ADMIN
    ? notificationsResponse?.allNotifications?.notifications?.slice(0, 5) || []
    : [];
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = () => {
    if (user?.role === Roles.USER) {
      navigate("/profile");
    } else {
      navigate("/doctor/profile");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#1e1e30] shadow-md">
      <h1 className="text-xl font-bold text-white">Fitsphere</h1>
      <div className="flex items-center gap-4">
        {user?.role === "user" && location.pathname === "/doctors/all" && (
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search"
            className="w-full sm:w-48 sm:pl-4 left-2 py-1 pl-1 text-sm rounded-md
           bg-[#2a2a40] text-white border border-gray-600 
           focus:outline-none focus:ring-1 focus:ring-purple-500 "
          />
        )}

        {user?.role !== "admin" && (
          <NotificationDropdown
            isOpen={isNotificationOpen}
            setIsOpen={setIsNotificationOpen}
            dropdownRef={notificationRef}
            setIsOtherDropdownOpen={setIsProfileOpen}
            notifications={notifications}
            role={user?.role}
          />
        )}
        <ProfileDropdown
          isOpen={isProfileOpen}
          setIsOpen={setIsProfileOpen}
          dropdownRef={profileRef}
          setIsOtherDropdownOpen={setIsNotificationOpen}
          user={user}
          handleLogout={handleLogout}
          isLoading={isLoading}
          handleNavigate={handleNavigate}
        />
      </div>
    </header>
  );
}

