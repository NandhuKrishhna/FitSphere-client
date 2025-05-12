import { useSelector } from "react-redux"
import { selectSelectedUser } from "@/redux/slice/socket.ioSlice"
import { Phone, Video, MoreHorizontal } from "lucide-react"
import { selectOnlineUsers } from "@/redux/slice/socket.ioSlice"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ChatHeader = () => {
  const selectedUser = useSelector(selectSelectedUser)
  const onlineUsers = useSelector(selectOnlineUsers)
  const isOnline = onlineUsers.includes(selectedUser?.doctorDetails?._id || "")

  return (
    <div className="border-b border-slate-700/50 p-4 flex items-center justify-between bg-slate-900/40">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="size-10 rounded-full overflow-hidden border border-slate-700">
            <img
              src={selectedUser?.doctorDetails?.profilePicture || "/avatar.png"}
              alt={selectedUser?.doctorDetails?.name || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
          )}
        </div>

        <div>
          <h3 className="font-medium text-slate-200">{selectedUser?.doctorDetails?.name || "Unknown User"}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <span className={`size-2 rounded-full ${isOnline ? "bg-green-500" : "bg-slate-500"}`}></span>
            {isOnline ? "Online now" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-slate-400 hover:text-violet-400 hover:bg-slate-800"
        >
          <Phone className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-slate-400 hover:text-violet-400 hover:bg-slate-800"
        >
          <Video className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-400 hover:text-violet-400 hover:bg-slate-800"
            >
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-200">
            <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">View Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">Clear Chat</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer text-red-400">Block User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default ChatHeader
