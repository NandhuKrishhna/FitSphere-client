import { useState } from "react"
import { useApproveRequestMutation, useGetNotificationQuery, useRejectRequestMutation } from "../../redux/api/adminApi"
import { formatDistanceToNow } from "date-fns"
import {
  User,
  Mail,
  Phone,
  Award,
  MailCheck,
  X,
  MapPinIcon as MapPinHouse,
  Languages,
  Album,
  Locate,
  IndianRupee,
  Paperclip,
  Bell,
  CheckCircle2,
  Filter,
} from "lucide-react"
import type { Notification } from "../../types/auth.types"
import toast from "react-hot-toast"
import { FaVenus } from "react-icons/fa"
import NotificationsSkeleton from "../../components/skeleton/NotificationSkeleton"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"

const NotificationPage = () => {
  const { data, isLoading, isError } = useGetNotificationQuery({})
  const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation()
  const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [filter, setFilter] = useState("all") // "all" or "unread"

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
  }

  const handleCloseDetails = () => {
    setSelectedNotification(null)
  }

  const handleApprove = async (userId: string) => {
    if (selectedNotification) {
      try {
        await approveRequest({ id: selectedNotification.userId, userId }).unwrap()
        toast.success("Request approved successfully")
        setIsOpen(false)
        setSelectedNotification(null)
      } catch (error) {
        console.error("Error approving request:", error)
      }
    }
  }

  const handleReject = async (userId: string) => {
    if (selectedNotification && rejectionReason.trim()) {
      try {
        await rejectRequest({ id: selectedNotification.userId, userId, reason: rejectionReason }).unwrap()
        toast.success("Request rejected and email sent successfully")
        setIsRejectModalOpen(false)
        setIsOpen(false)
        setRejectionReason("")
        setSelectedNotification(null)
      } catch (error) {
        console.error("Error rejecting request:", error)
      }
    } else {
      toast.error("Please enter a rejection reason")
    }
  }

  const filteredNotifications = Array.isArray(data?.notification?.notification)
    ? filter === "all"
      ? data.notification.notification
      : data.notification.notification.filter((notif: Notification) => !notif.read)
    : []

  const unreadCount = Array.isArray(data?.notification?.notification)
    ? data.notification.notification.filter((notif: Notification) => !notif.read).length
    : 0

  if (isLoading) return <NotificationsSkeleton />
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">Error loading notifications</div>
    )

  return (
    <div >
      <Header />
      <Navigation />

      <div className="flex min-h-screen bg-gradient-to-br from-indigo-900 to-black">

        <div className="flex gap-6 w-full p-6 items-start">
          {/* Notifications List */}
          <div
            className={`h-[calc(100vh-3rem)] bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex-1 ${selectedNotification ? "w-2/5" : "w-1/2"
              }`}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Bell className="text-indigo-400 h-6 w-6" />
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>
              {unreadCount > 0 && (
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <p className="font-bold text-white">{unreadCount}</p>
                </div>
              )}
            </div>

            <div className="w-full bg-gray-800 flex items-center px-5 py-4 justify-between sticky top-0 z-10">
              <div className="flex space-x-6 items-center text-gray-300">
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${filter === "all" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}
                  onClick={() => setFilter("all")}
                >
                  <Filter size={16} />
                  <span>All</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${filter === "unread" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}
                  onClick={() => setFilter("unread")}
                >
                  <span>Unread</span>
                  <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 transition-colors">
                <MailCheck size={18} />
                <span className="text-sm">Mark all as read</span>
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-8rem)]">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <CheckCircle2 size={48} className="mb-3 text-gray-600" />
                  <p>No notifications to display</p>
                </div>
              ) : (
                filteredNotifications.map((notification: Notification) => (
                  <div
                    key={notification._id}
                    className={`border-b border-gray-800 p-4 cursor-pointer transition-all duration-200 ${selectedNotification?._id === notification._id ? "bg-indigo-900/30" : "hover:bg-gray-800/70"
                      }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                          {notification.profilePicture ? (
                            <img
                              src={notification.profilePicture || "/placeholder.svg"}
                              alt="User Avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-indigo-600 flex items-center justify-center">
                              <span className="text-white font-bold">
                                {notification.metadata?.name?.slice(0, 2).toUpperCase() || "UN"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-white truncate">
                            {notification.metadata?.name || "Unknown User"}
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-xs text-gray-400">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </p>
                            {!notification.read && <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1"></div>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Details Panel */}
          {selectedNotification ? (
            <div className="h-[calc(100vh-3rem)] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300 flex-1 flex flex-col">
              {/* Header */}
              <div className="bg-gray-800 p-6 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
                  onClick={handleCloseDetails}
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full border-4 border-indigo-500/30 overflow-hidden flex items-center justify-center bg-indigo-600 shadow-lg shadow-indigo-500/20">
                    {selectedNotification.profilePicture ? (
                      <img
                        src={selectedNotification.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-2xl font-bold">
                        {selectedNotification.metadata?.name?.slice(0, 2).toUpperCase() || "UN"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-white text-2xl font-bold">
                      {selectedNotification.metadata?.name || "Unknown User"}
                    </h2>
                    <p className="text-indigo-300 text-md">
                      {selectedNotification.metadata?.primarySpecialty || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Bio */}
                {selectedNotification.metadata?.bio && (
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start gap-3">
                      <User className="text-indigo-400 flex-shrink-0 mt-1" />
                      <p className="text-gray-300">{selectedNotification.metadata.bio}</p>
                    </div>
                  </div>
                )}

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedNotification.metadata?.experience && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <Award className="text-indigo-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Experience</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.experience} years</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.professionalEmail && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <Mail className="text-indigo-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-white font-medium truncate">
                          {selectedNotification.metadata.professionalEmail}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.gender && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <FaVenus className="text-indigo-400 text-xl flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Gender</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.gender}</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.contactPhoneNumber && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <Phone className="text-indigo-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.contactPhoneNumber}</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.consultationFees && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <IndianRupee className="text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Consultation Fees</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.consultationFees}</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.officeAddress && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <MapPinHouse className="text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Office Address</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.officeAddress}</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.clinicLocations && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <Locate className="text-yellow-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Clinic Locations</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.clinicLocations}</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.consultationLanguages && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <Languages className="text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Languages</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.consultationLanguages}</p>
                      </div>
                    </div>
                  )}

                  {selectedNotification.metadata?.medicalLicenseNumber && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3">
                      <Album className="text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">License Number</p>
                        <p className="text-white font-medium">{selectedNotification.metadata.medicalLicenseNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Attachment Button */}
                {selectedNotification.metadata?.certificate && (
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 inline-flex items-center gap-2 justify-center rounded-lg text-white px-4 py-2 transition-colors w-full sm:w-auto"
                    onClick={() => setIsOpen(true)}
                  >
                    View Attachment
                    <Paperclip size={16} />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-end gap-3">
                <button
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                  onClick={() => setIsRejectModalOpen(true)}
                  disabled={isRejecting}
                >
                  {isRejecting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing
                    </span>
                  ) : (
                    "Reject"
                  )}
                </button>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                  onClick={() => handleApprove(selectedNotification.userId)}
                  disabled={isApproving}
                >
                  {isApproving ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing
                    </span>
                  ) : (
                    "Accept"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex h-[calc(100vh-3rem)] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300 flex-1 items-center justify-center">
              <div className="text-center p-6">
                <Bell size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-medium text-white mb-2">No notification selected</h3>
                <p className="text-gray-400">Select a notification from the list to view details</p>
              </div>
            </div>
          )}
        </div>

        {/* Attachment Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="relative bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h3 className="text-lg font-medium text-white">Attachment</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex items-center justify-center">
                <img
                  src={selectedNotification?.metadata?.certificate || "/placeholder.svg"}
                  alt="Attachment"
                  className="max-w-full max-h-[70vh] rounded-md object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        {isRejectModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-xl text-white font-semibold mb-4">Rejection Reason</h2>
              <p className="text-gray-300 text-sm mb-4">
                Please provide a reason for rejecting this request. This will be sent to the user.
              </p>
              <textarea
                className="w-full p-3 border rounded-lg text-gray-900 bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                rows={4}
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsRejectModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-lg transition-colors"
                  onClick={() => handleReject(selectedNotification!.userId)}
                  disabled={!rejectionReason.trim()}
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationPage

