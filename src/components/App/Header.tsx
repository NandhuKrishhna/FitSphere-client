import { useLogout } from "@/hooks/userLogoutHook";
import { useGetAllNotificationQuery } from "@/redux/api/appApi";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Roles } from "@/utils/Enums";
import { Bell, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  role?: string;
}

interface INotification {
  _id: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: string;
  metadata?: {
    meetingId?: string;
    appointMentId?: string;
  };
}

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setIsOtherDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser | null;
  handleLogout?: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  handleNavigate?: () => void;
}

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Header({ value, onChange }: Props) {
  const { data: notificationsData } = useGetAllNotificationQuery({});
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { handleLogout, isLoading } = useLogout();

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
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
          className="w-full sm:w-48 sm:pl-4 left-2 py-1 pl-1 text-sm rounded-md bg-[#2a2a40] text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 "
        />

        <NotificationDropdown
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
          dropdownRef={notificationRef}
          setIsOtherDropdownOpen={setIsProfileOpen}
          notifications={notificationsData?.allNotifications || []}
          role={user?.role}
        />
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

interface NotificationDropdownProps extends DropdownProps {
  notifications?: INotification[];
  role?:string
}

function NotificationDropdown({ 
  isOpen, 
  setIsOpen, 
  setIsOtherDropdownOpen, 
  dropdownRef, 
  notifications = [],
  role
}: NotificationDropdownProps) {
  console.log(role,"From NotificationDrop down")
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
  

  const handleNotificationClick = (notification: INotification) => {
    if (notification.type === "appointment" && notification.metadata?.appointMentId) {
      navigate(`/consultation/${notification.metadata.meetingId}`);
    } else {
      if (role === Roles.USER) {
        navigate("/notifications");
      } else {
        navigate("/doctor/notifications");
      }
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
          className="absolute top-full right-0 mt-2 w-72 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
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
                  onClick={() => handleNotificationClick(notification)}
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
               onClick={() =>{
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

function ProfileDropdown({
  isOpen,
  setIsOpen,
  setIsOtherDropdownOpen,
  dropdownRef,
  user,
  handleLogout,
  isLoading,
  handleNavigate,
}: DropdownProps) {
  return (
    <div className="relative text-white">
      <button
        className="w-8 h-8 rounded-full  flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          if (setIsOtherDropdownOpen) setIsOtherDropdownOpen(false);
        }}
      >
        <img src={user?.profilePicture} alt="" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full  flex items-center justify-center mr-3">
                <img src={user?.profilePicture} alt="" />
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center" onClick={handleNavigate}>
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </button>
            <button
              className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>{isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}