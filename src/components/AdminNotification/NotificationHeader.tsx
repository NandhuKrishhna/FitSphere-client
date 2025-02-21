import { MailCheck } from "lucide-react";

interface NotificationHeaderProps {
  notificationCount: number;
}

export const NotificationHeader = ({ notificationCount }: NotificationHeaderProps) => {
  return (
    <>
      <div className="flex items-center">
        <h2 className="text-3xl font-bold text-white p-4">Notifications</h2>
        {notificationCount > 0 && (
          <div className="w-8 h-8 bg-yellow-500 mt-5 rounded-full flex items-center justify-center">
            <p className="font-bold text-lg p-1 text-black">{notificationCount}</p>
          </div>
        )}
      </div>
      <div className="w-full h-[60px] bg-[#525252] flex items-center px-3 justify-between">
        <div className="flex space-x-2 items-center text-white">
          <p>All</p>
          <p>Unread(12)</p>
        </div>
        <div className="flex space-x-2 items-center text-white">
          <MailCheck />
          <p>Mark as Read</p>
        </div>
      </div>
    </>
  );
};