import { useState, useEffect } from "react"
import { Bell, Check, CheckCircle, Loader, Video, Filter, } from "lucide-react"
import { useGetAllNotificationQuery, useMarkAsReadMutation } from "@/redux/api/appApi"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import type { ErrorResponse } from "@/hooks/DoctorHooks/doctorLoginHook"
import toast from "react-hot-toast"
import useHandleJoinMeeting from "@/hooks/App/useJoinMeeting"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination } from "@/components/App/TestPagination"


export type Notification = {
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

export type NotificationFilters = {
  page: string
  limit: string
  sortOrder: "asc" | "desc"
  type?: string
}

export default function NotificationPage() {
  const user = useSelector(selectCurrentUser)
  const { handleJoinMeet, loadingItems } = useHandleJoinMeeting()

  const [filters, setFilters] = useState<NotificationFilters>({
    page: "1",
    limit: "5",
    sortOrder: "desc",
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: notificationsData, isLoading } = useGetAllNotificationQuery(filters)

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [markAsRead] = useMarkAsReadMutation()
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (notificationsData?.allNotifications) {
      if (Array.isArray(notificationsData.allNotifications)) {
        setNotifications(notificationsData.allNotifications)
      } else if (notificationsData.allNotifications.notifications) {
        setNotifications(notificationsData.allNotifications.notifications)
        setTotalPages(notificationsData.allNotifications.totalPages || 1)
        setCurrentPage(Number(notificationsData.allNotifications.currentPage) || 1)
      }
    }
  }, [notificationsData])

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead({ notificationId }).unwrap()
    } catch (error) {
      const err = error as ErrorResponse
      if (err.data.message) return toast.error(err.data.message)
      toast.error("Something went wrong")
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

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setFilters((prev) => ({ ...prev, page: newPage.toString() }))
  }

  const clearFilters = () => {
    setFilters({
      page: "1",
      limit: "5",
      sortOrder: "desc",
    })
  }

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      type: value === "all" ? undefined : value,
      page: "1",
    }))
  }

  const handleSortChange = (value: "asc" | "desc") => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: value,
      page: "1",
    }))
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-indigo-500"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {showFilters && (
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select onValueChange={handleTypeChange} defaultValue="all" value={filters.type || "all"}>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-indigo-300 border-gray-700">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="message">Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort Order</label>
                  <Select
                    onValueChange={(value) => handleSortChange(value as "asc" | "desc")}
                    defaultValue="desc"
                    value={filters.sortOrder}
                  >
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Sort Order" />
                    </SelectTrigger>
                    <SelectContent className="bg-indigo-300 border-gray-700">
                      <SelectItem value="desc">Newest First</SelectItem>
                      <SelectItem value="asc">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={clearFilters} className="text-black bg-emerald-300">
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No notifications found</p>
            {filters.type && (
              <Button variant="link" onClick={clearFilters} className="mt-2 text-indigo-400">
                Clear filters and try again
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`bg-gray-900 rounded-lg p-4 border ${notification.read ? "border-gray-800" : "border-indigo-800"
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
                          className={`ml-2 p-1 rounded-full ${notification.read
                            ? "text-green-500 bg-green-900/20"
                            : "text-gray-400 hover:text-green-500 hover:bg-green-900/20"
                            }`}
                          title="Mark as read"
                        >
                          {!notification.read && <Check className="h-5 w-5" />}
                        </button>
                      </div>

                      {notification.type === "appointment" && notification.metadata.meetingId && (
                        <div className="mt-3">
                          <button
                            onClick={() => handleJoinMeet(notification.metadata.meetingId)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                          >
                            {loadingItems[notification.metadata.meetingId] ? (
                              <Loader className="animate-spin mx-auto" size={18} />
                            ) : (
                              "Join Meeting"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}