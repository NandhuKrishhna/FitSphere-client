import { useState, useEffect } from "react"
import { Bell, Check, CheckCircle, Loader, Video } from "lucide-react"
import { useGetAllNotificationQuery, useMarkAsReadMutation } from "@/redux/api/appApi"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { ErrorResponse } from "@/hooks/DoctorHooks/doctorLoginHook"
import toast from "react-hot-toast"
import useHandleJoinMeeting from "@/hooks/App/useJoinMeeting"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
//TODO after the video call the notifiction should expired.....

type Notification = {
  _id: string
  userId: string
  role: string
  type: string
  message: string
  status: string
  metadata: {
    meetingId: string
    appointMentId: string
  }
  read: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export default function NotificationPage() {
  const user = useSelector(selectCurrentUser)
    const {  handleJoinMeet ,loadingItems} = useHandleJoinMeeting();
  const { data: notificationsData, isLoading } = useGetAllNotificationQuery({})
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [markAsRead] = useMarkAsReadMutation()
  useEffect(() => {
    if (notificationsData?.allNotifications && notificationsData.allNotifications.length > 0) {
      setNotifications(notificationsData.allNotifications)
    }
  }, [notificationsData])

  console.log(notificationsData)

  const handleMarkAsRead = async (notificationId: string) => {
    console.log(`Marking notification as read: ${notificationId}`)
    try {
        const response = await markAsRead({notificationId: notificationId}).unwrap();
        console.log(response)
    } catch (error) {
      const err = error as ErrorResponse;
      if(err.data.message) return toast.error(err.data.message);
      toast.error("Something went wrong");
    }
  }

  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Video className="h-6 w-6 text-indigo-500" />
      case "message":
        return <Bell className="h-6 w-6 text-blue-500" />
      case "system":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      default:
        return <Bell className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {user?.role === "user" && (
  <>
    <Header />
    <Navigation />
  </>
)}


      <main className="max-w-4xl mx-auto py-6 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-gray-900 rounded-lg p-4 border ${
                  notification.read ? "border-gray-800" : "border-indigo-800"
                } transition-all hover:bg-gray-800`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-gray-400 mt-1">{formatDate(notification.createdAt)}</p>
                      </div>

                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        className={`ml-2 p-1 rounded-full ${
                          notification.read
                            ? "text-green-500 bg-green-900/20"
                            : "text-gray-400 hover:text-green-500 hover:bg-green-900/20"
                        }`}
                        title="Mark as read"
                      >
                        {!notification.read  && <Check className="h-5 w-5 " />}
                      </button>
                    </div>

                    {notification.type === "appointment" && notification.metadata.meetingId && (
                      <div className="mt-3">
                        <button
                          onClick={() => handleJoinMeet(notification.metadata.meetingId)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                         {loadingItems[notification.metadata.meetingId] ?<Loader className=' animate-spin mx-auto' size={18} /> : "Join Meeting"}
                          
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}