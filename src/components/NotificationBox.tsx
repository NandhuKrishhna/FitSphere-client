import { MailCheck } from "lucide-react";
import NotificationContainer from "./NotificationContainer";

const NotificationBox = ({ length = 1 }) => {
  return (
    <div className="w-1/2 h-[750px] bg-[#1c1c1c]  rounded-lg ">
      <div className="flex  ">
        <h2 className="text-3xl font-bold text-white p-4">Notifications</h2>
        {length > 0 && (
          <div className="w-8 h-8 bg-yellow-500 mt-5 rounded-full items-center flex justify-center">
            {<p className="font-bold text-1xl p-1 text-black">{length}</p>}
          </div>
        )}
      </div>
      <div className="w-full h-[60px] bg-[#525252] flex items-center px-3 justify-between">
        {/* Left Side: Text */}
        <div className="flex space-x-2 items-center">
          <p>All</p>
          <p>Unread(12)</p>
        </div>
        <div className="flex space-x-2 items-center text-white">
          <MailCheck />
          <p>Mark as Read</p>
        </div>
      </div>

      {/* Notification List */}
      <NotificationContainer />
      <NotificationContainer />
      <NotificationContainer />
      <NotificationContainer />
      <NotificationContainer />
      <NotificationContainer />
    </div>
  );
};

export default NotificationBox;
