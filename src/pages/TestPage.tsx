import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useApproveRequestMutation, useGetNotificationQuery, useRejectRequestMutation } from "../redux/api/adminApi";
import { Notification } from "../types/NotificationTypes";
import { NotificationList } from "../components/AdminNotification/NotificationList";
import { NotificationDetails } from "../components/AdminNotification/NotificationDetails";

const NotificationPage = () => {
    const [expanded, setExpanded] = useState(true);
    const { data, isLoading, isError } = useGetNotificationQuery({});
    const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation();
    const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation();
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [showImagePreview, setShowImagePreview] = useState(false);
  
    const handleNotificationClick = (notification: Notification) => {
      setSelectedNotification(notification);
    };
  
    const handlePreview = () => setShowImagePreview(true);
    const handleClosePreview = () => setShowImagePreview(false);
  
    const handleApprove = async (userId: string) => {
      if (selectedNotification) {
        try {
          await approveRequest({ id: selectedNotification.userId, userId }).unwrap();
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
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        
        <div className="flex gap-6 w-full items-center px-6">
          <NotificationList
            notifications={data?.notification?.notification || []}
            onNotificationClick={handleNotificationClick}
          />
          
          <NotificationDetails
            notification={selectedNotification}
            onApprove={handleApprove}
            onReject={handleReject}
            isApproving={isApproving}
            isRejecting={isRejecting}
            onPreviewImage={handlePreview}
          />
  
          {/* Image Preview Modal */}
          {showImagePreview && selectedNotification && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-600 p-6 rounded-lg">
                <img
                  src={selectedNotification.metadata?.newDoctorDetails?.profilePicture || ""}
                  alt="Preview"
                  className="w-[500px] h-[500px] object-cover"
                />
                <button
                  className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
                  onClick={handleClosePreview}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default NotificationPage;