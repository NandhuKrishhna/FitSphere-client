import { Notification } from "../../types/NotificationTypes";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationItem } from "./NotificationItems";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export const NotificationList = ({ notifications, onNotificationClick }: NotificationListProps) => {
  return (
    <div className="w-1/2 h-[750px] bg-[#1c1c1c] rounded-lg overflow-y-auto">
      <NotificationHeader notificationCount={notifications.length} />
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onClick={onNotificationClick}
        />
      ))}
    </div>
  );
};
