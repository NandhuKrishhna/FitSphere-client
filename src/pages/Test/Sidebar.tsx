import { Users, Search, UserCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetSidebarUsersQuery } from "@/redux/api/chatApi"
import { selectOnlineUsers, selectSelectedUser, setSelectedUser } from "@/redux/slice/socket.ioSlice"
import { getSocket } from "@/lib/socketManager"
import { AvatarDemo } from "@/components/App/Avatar"
import type { ISidebarUsers } from "@/types/api/chat-api-types"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarSkeleton from "./SidebarSkeleton"
import { Switch } from "@/components/ui/switch"


const Sidebar = () => {
  const { data, isLoading, refetch } = useGetSidebarUsersQuery(undefined)
  const dispatch = useDispatch()
  const onlineUsers = useSelector(selectOnlineUsers)
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const socket = getSocket()
  const selectedUserId = useSelector(selectSelectedUser)?.doctorDetails?._id

  useEffect(() => {
    socket?.on("newMessage", () => {
      refetch()
    })

    return () => {
      socket?.off("newMessage")
    }
  }, [socket, refetch])

  useEffect(() => {
    if (selectedUserId) {
      refetch()
    }
  }, [selectedUserId])

  const sortedUsers = data?.users ? [...data.users] : []

  if (selectedUserId) {
    const index = sortedUsers.findIndex((user) => user.doctorDetails?._id === selectedUserId)
    if (index !== -1) {
      const [selected] = sortedUsers.splice(index, 1)
      sortedUsers.unshift(selected)
    }
  }

  const filteredUsers = sortedUsers.filter((user) => {
    const meetsOnlineFilter = showOnlineOnly ? onlineUsers.includes(user.doctorDetails?._id) : true
    const meetsSearchFilter = searchTerm
      ? user.doctorDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    return meetsOnlineFilter && meetsSearchFilter
  })

  if (isLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-slate-700/50 flex flex-col transition-all duration-200 bg-slate-900/40">
      <div className="border-b border-slate-700/50 w-full p-5">
        <div className="flex items-center gap-2">
          <div className="bg-violet-500/10 p-2 rounded-lg">
            <Users className="size-5 text-violet-400" />
          </div>
          <span className="font-medium text-violet-300 hidden lg:block">Contacts</span>
        </div>

        {/* Search input - visible in both mobile and desktop */}
        <div className="mt-4 relative hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-violet-500"
            />
          </div>
        </div>

        {/* Online filters - visible only on desktop */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="online-mode"
              checked={showOnlineOnly}
              onCheckedChange={setShowOnlineOnly}
              className="data-[state=checked]:bg-violet-500"
            />
            <Label htmlFor="online-mode" className="text-sm text-slate-300">
              Show online only
            </Label>
          </div>
          <Badge variant="outline" className="text-xs text-violet-300 border-violet-500/30 bg-violet-500/10">
            {onlineUsers.length - 1} online
          </Badge>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: ISidebarUsers) => (
            <button
              key={user?.doctorDetails?._id}
              onClick={() => dispatch(setSelectedUser({ ...user, lastMessage: user.lastMessage ?? "" }))}
              className={`w-full p-3 flex items-center justify-between gap-3 hover:bg-slate-800/50 transition-colors ${user.doctorDetails?._id === selectedUserId ? "bg-slate-800/80 border-l-2 border-violet-500" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AvatarDemo image={user.doctorDetails?.profilePicture} name={user.doctorDetails?.name} />
                  {onlineUsers.includes(user.doctorDetails?._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
                  )}
                </div>

                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium text-slate-200 truncate flex items-center gap-1">
                    {user.doctorDetails?.name || "Unknown"}
                    {onlineUsers.includes(user.doctorDetails?._id) && <UserCheck className="size-3 text-green-500" />}
                  </div>
                  <p className="text-sm text-slate-400 truncate">
                    {user.lastMessage?.slice(0, 30) || "No messages yet"}
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-slate-500 py-8 px-4">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <Search className="size-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400">{searchTerm ? "No users found matching your search" : "No users found"}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
