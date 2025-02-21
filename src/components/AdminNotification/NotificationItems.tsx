import { formatDistanceToNow } from "date-fns";
import { Notification } from "../../types/NotificationTypes";


interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

export const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  return (
    <div
      className="mt-3 w-full h-[80px] flex items-center px-3 cursor-pointer hover:bg-[#2c2c2c] transition-colors"
      onClick={() => onClick(notification)}
    >
      <div className="avatar flex items-center">
        <div className="w-14 h-14 rounded-xl overflow-hidden">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="User Avatar"
          />
        </div>
      </div>
      <p className="p-2 font-bold text-white flex-1">{notification.message}</p>
      <div className="flex flex-col items-end">
        <p className="text-sm text-white ml-auto">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
        {!notification.read && (
          <div className="w-6 h-6 bg-indigo-500 rounded-full ml-16 mt-1"></div>
        )}
      </div>
    </div>
  );
};