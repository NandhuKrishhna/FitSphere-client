import { useState } from "react";
import { useApproveRequestMutation, useGetNotificationQuery, useRejectRequestMutation } from "../../redux/api/adminApi";
import { formatDistanceToNow } from 'date-fns';
import { User, Mail, Phone, Award, MailCheck, } from 'lucide-react';
import { Notification } from "../../types/auth.types";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";

const NotificationPage = () => {
  const [expanded, setExpanded] = useState(true);
  const { data, isLoading, isError } = useGetNotificationQuery({});
  const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation();
  const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleApprove = async (userId: string) => {
    if (selectedNotification) {
      try {
        await approveRequest({ id: selectedNotification.userId, userId }).unwrap();
        console.log(`Approved: ${selectedNotification._id} for user: ${userId}`);
        toast.success("Request approved successfully");
      } catch (error) {
        console.error("Error approving request:", error);
      }
    }
  };

  const handleReject = async (userId: string) => {
    if (selectedNotification) {
      try {
        await rejectRequest({ id: selectedNotification.userId, userId }).unwrap();
        console.log(`Rejected: ${selectedNotification._id} for user: ${userId}`);
        toast.success("Request rejected successfully");
      } catch (error) {
        console.error("Error rejecting request:", error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notifications</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-bl from-indigo-400 to-black">
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <div className="flex gap-6 w-full items-center px-6">
        {/* Notifications List */}
        <div className="w-1/2 h-[750px] bg-[#1c1c1c] rounded-lg overflow-y-auto">
          <div className="flex">
            <h2 className="text-3xl font-bold text-white p-4">Notifications</h2>
            {data?.notification?.notification?.length > 0 && (
              <div className="w-8 h-8 bg-yellow-500 mt-5 rounded-full items-center flex justify-center">
                <p className="font-bold text-1xl p-1 text-black">{data.notification.notification.length}</p>
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

          {/* Notification Items */}
          {Array.isArray(data?.notification?.notification) &&
            data.notification.notification.map((notification: Notification) => (
              <div
                key={notification._id}
                className="mt-3 w-full h-[80px] overflow-y-auto flex items-center px-3 cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
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
                <div>
                  <p className="text-sm text-white ml-auto">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                  {!notification.read && (
                    <div className="w-6 h-6 bg-indigo-500 rounded-full items-center ml-16 mt-1"></div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Details Panel */}
        <div className="w-1/2 h-[750px] bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl border border-[#2A2A2A]">
          {selectedNotification ? (
            <>
              <div className="bg-[#2C2C2C] p-6 text-center">
                <div className="w-24 h-24 rounded-full border-4 border-[#3A3A3A] mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gray-500">
                  <span className="text-white text-2xl font-bold">
                    {selectedNotification.metadata?.doctorName?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-white text-2xl font-bold">{selectedNotification.metadata?.doctorName}</h2>
                <p className="text-gray-300 text-md">{selectedNotification.metadata?.newDoctorDetails?.primarySpecialty || 'Not specified'}</p>
              </div>

              <div className="p-6 space-y-4 text-white">
                <div className="flex items-start space-x-3 flex-wrap">
                  <User className="text-blue-400" />
                  <p className="text-gray-300 flex-1">{selectedNotification.metadata?.newDoctorDetails?.bio}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Award className="text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Experience</p>
                      <p className="font-semibold">{selectedNotification.metadata?.newDoctorDetails?.experience} years</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="text-yellow-400" />
                    <div>
                      <p className="font-semibold">{selectedNotification.metadata?.newDoctorDetails.professionalEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-blue-400" />
                    <p className="text-gray-300">{selectedNotification.metadata?.newDoctorDetails?.contactPhoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mr-9 text-black font-semibold">
                <button
                  className="bg-gradient-to-br from-green-400 to-green-600 px-4 py-2 rounded-xl"
                  onClick={() => handleApprove(selectedNotification.userId)}
                  disabled={isApproving}
                >
                  {isApproving ? "Approving..." : "Accept"}
                </button>
                <button
                  className="bg-red-400 px-4 py-2 rounded-xl"
                  onClick={() => handleReject(selectedNotification.userId)}
                  disabled={isRejecting}
                >
                  {isRejecting ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-white text-lg p-6">Select a notification to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;