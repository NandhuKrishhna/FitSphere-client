import { useState } from "react";
import { useApproveRequestMutation, useGetNotificationQuery, useRejectRequestMutation } from "../../redux/api/adminApi";
import { formatDistanceToNow } from "date-fns";
import { User, Mail, Phone, Award, MailCheck, X, MapPinHouse, Languages, Album, Locate, IndianRupee, Paperclip } from "lucide-react";
import { Notification } from "../../types/auth.types";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import { FaVenus } from "react-icons/fa";
import NotificationsSkeleton from "../../components/skeleton/NotificationSkeleton";

const NotificationPage = () => {
  const [expanded, setExpanded] = useState(true);
  const { data, isLoading, isError } = useGetNotificationQuery({});
  const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation();
  const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };

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
    if (selectedNotification && rejectionReason.trim()) {
      try {
        await rejectRequest({ id: selectedNotification.userId, userId, reason: rejectionReason }).unwrap();
        toast.success("Request rejected and email sent successfully");
        setIsRejectModalOpen(false);
        setRejectionReason(""); 
      } catch (error) {
        console.error("Error rejecting request:", error);
      }
    } else {
      toast.error("Please enter a rejection reason");
    }
  };
  

  if (isLoading) return <NotificationsSkeleton/>;
  if (isError) return <div>Error loading notifications</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-bl from-indigo-400 to-black">
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <div className="flex gap-6 w-full px-6 items-center">
        {/* Notifications List */}
        <div
          className={` h-[100%] bg-[#1c1c1c] rounded-lg overflow-y-auto transition-all duration-300 flex-1 ${
            selectedNotification ? "w-2/5" : "w-1/2"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-3xl font-bold text-white">Notifications</h2>
            {data?.notification?.notification?.length > 0 && (
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <p className="font-bold text-black">{data.notification.notification.length}</p>
              </div>
            )}
          </div>

          <div className="w-full h-[60px] bg-[#525252] flex items-center px-3 justify-between">
            <div className="flex space-x-2 items-center text-white">
              <p>All</p>
              <p>Unread({})</p>
            </div>
            <div className="flex space-x-2 items-center text-white">
              <MailCheck />
              <p>Mark as Read</p>
            </div>
          </div>

          {Array.isArray(data?.notification?.notification) &&
            data.notification.notification.map((notification: Notification) => (
              <div
                key={notification._id}
                className="mt-3 w-full h-[80px] flex items-center px-3 cursor-pointer hover:bg-[#333] transition duration-200"
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
                    <div className="w-4 h-4 bg-indigo-500 rounded-full ml-16 mt-1"></div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Details Panel */}
        {selectedNotification && (
          <div className="h-[100%] bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl border border-[#2A2A2A] transition-all duration-300 flex-1">
            {/* Close Button */}
            <button
              className="absolute top-3 right-7 text-white bg-red-500 p-2 rounded-full hover:bg-red-800"
              onClick={handleCloseDetails}
            >
              <X size={18} />
            </button>

            <div className="bg-[#2C2C2C] p-6 text-center">
              <div className="w-24 h-24 rounded-full border-4 border-[#3A3A3A] mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gray-500">
                <span className="text-white text-2xl font-bold">
                  {selectedNotification.metadata?.doctorName?.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold">{selectedNotification.metadata?.doctorName}</h2>
              <p className="text-gray-300 text-md">
                {selectedNotification.metadata?.newDoctorDetails?.primarySpecialty || "Not specified"}
              </p>
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
                    <p className="font-semibold">
                      {selectedNotification.metadata?.newDoctorDetails?.experience} years
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-yellow-400" />
                  <div>
                    <p className="font- text-sm">{selectedNotification.metadata?.newDoctorDetails?.professionalEmail}</p>
                  </div>
                </div>
                {/*Gender*/}
                <div className="flex items-center space-x-2">
                <FaVenus className="text-2xl" />
                  <div>
                    <p className="font- text-sm">{selectedNotification.metadata?.newDoctorDetails?.gender}</p>
                  </div>
                </div>
                   {/*Location*/}
                <div className="flex items-center space-x-2">
                  <Phone className="text-blue-400" />
                  <p className="text-gray-300">{selectedNotification.metadata?.newDoctorDetails?.contactPhoneNumber}</p>
                </div>
                  {/*Location*/}
                  <div className="flex items-center space-x-2">
                  <IndianRupee className="text-green-500" />
                  <p className="text-gray-300">{selectedNotification.metadata?.newDoctorDetails?.consultationFees}</p>
                </div>
                  {/*Location*/}
                  <div className="flex items-center space-x-2">
                  <MapPinHouse className="text-red-600" />
                  <p className="text-gray-300 text-sm">{selectedNotification.metadata?.newDoctorDetails?.officeAddress}</p>
                </div>
                   {/*Location*/}
                   <div className="flex items-center space-x-2">
                   <Locate  />
                  <p className="text-gray-300 text-sm">{selectedNotification.metadata?.newDoctorDetails?.clinicLocations}</p>
                </div>
                   {/*Location*/}
                   <div className="flex items-center space-x-2">

                  <Languages />
                  <p className="text-gray-300">{selectedNotification.metadata?.newDoctorDetails?.consultationLanguages}</p>
                </div>
                  {/*Location*/}
                  <div className="flex items-center space-x-2">
                  <Album />
                  <p className="text-gray-300">{selectedNotification.metadata?.newDoctorDetails?.medicalLicenseNumber}</p>
                </div>
              </div>
              <button className="bg-zinc-600 inline-flex items-center  gap-3  justify-center rounded-sm text-white p-2 hover:bg-zinc-700 "
               onClick={() =>{
                setIsOpen(true)
               }}>
              Attachment 
              <Paperclip  />
              </button>


            </div>

            <div className="flex justify-end space-x-2 mr-9  text-black font-semibold">
              <button
                className="bg-indigo-200 px-4 py-2 rounded-xl"
                onClick={() => handleApprove(selectedNotification.userId)}
                disabled={isApproving}
              >
                {isApproving ? <span className="loading loading-ring loading-md"></span>: "Accept"}
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded-xl"
                onClick={() => setIsRejectModalOpen(true)}
                disabled={isRejecting}
              >
                {isRejecting ? <span className="loading loading-ring loading-md"></span> : "Reject"}
              </button>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-indigo-400 p-4 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-1 bg-gray-700 rounded-full p-1 text-white hover:text-red-600"
            >
              <X size={24} />
            </button>
            <img
              src={selectedNotification?.metadata?.newDoctorDetails?.profilePicture}
              alt="Attachment"
              className="max-w-full max-h-[80vh] rounded-md"
            />
          </div>
        </div>
      )}
      {isRejectModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-zinc-500 p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl text-black font-semibold mb-2">Enter Rejection Reason</h2>
      <textarea
        className="w-full p-2 border rounded-md text-black bg-gray-300"
        rows={3}
        placeholder="Enter reason..."
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
      ></textarea>
      <div className="flex justify-end space-x-3 mt-4">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => setIsRejectModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 px-4 py-2 text-white rounded-md"
          onClick={() => handleReject(selectedNotification!.userId)}
        >
          Confirm Reject
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default NotificationPage;
