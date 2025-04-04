import { DropdownProps, INotification } from "@/types/userTypes";
import { Roles } from "@/utils/Enums";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotificationDropdownProps extends DropdownProps {
  notifications?: INotification[];
  role?: string;
}

export function NotificationDropdown({
  isOpen,
  setIsOpen,
  setIsOtherDropdownOpen,
  dropdownRef,
  notifications = [],
  role
}: NotificationDropdownProps) {
  const navigate = useNavigate();
  const unreadNotifications = notifications.filter(n => !n.read);
  const unreadCount = unreadNotifications.length;

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInMins < 60) {
      return `${diffInMins} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const handleNotificationClick = () => {
    if (role === Roles.USER) {
      navigate("/notifications");
    } else {
      navigate("/doctor/notifications");
    }

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="p-2 relative"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          if (setIsOtherDropdownOpen) setIsOtherDropdownOpen(false);
        }}
      >
        <Bell className="w-5 h-5 text-gray-400" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center">
            <div className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs font-medium bg-red-500 text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          </div>
        )}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-72 bg-[#1e1e30] text-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-medium">Unread Notifications</h3>
            {unreadNotifications.length > 0 && (
              <button
                className="text-xs text-purple-400 hover:text-purple-300"
                onClick={() => {
                  if (role === Roles.USER) {
                    navigate("/notifications");
                  } else {
                    navigate("/doctor/notifications");
                  }
                  setIsOpen(false);
                }}
              >
                View All
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-3 border-b border-gray-700 hover:bg-[#2a2a40] cursor-pointer"
                  onClick={() => handleNotificationClick()}
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold">FS</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.createdAt)}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-400 text-sm">
                <h1 className="text-red-400">No Unread Notifications</h1>
                <button
                  onClick={() => {
                    if (role === Roles.USER) {
                      navigate("/notifications");
                    } else {
                      navigate("/doctor/notifications");
                    }
                  }}
                  className="mt-4 font-bold bg-indigo-500 px-7 py-1.5 rounded-lg text-white cursor-pointer">View All Notifications</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

