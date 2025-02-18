import { Search } from "lucide-react";

import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useGetSidebarUsersQuery } from "@/redux/api/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUsers, setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { Users } from "@/types/ChatTypes";

const ChatSideBar = () => {
  const { data, isLoading } = useGetSidebarUsersQuery({});
  const dispatch = useDispatch();
  // console.log("sidebar , users", data);
  const onlineUsers = useSelector(selectOnlineUsers);
  console.log(onlineUsers);

  return (
    <div className="w-80 border-r border-zinc-800 h-full">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input placeholder="Search" className="bg-zinc-800 pl-9 text-zinc-100 border-none" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-4 hover:bg-zinc-800/50 cursor-pointer">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <Skeleton className="h-4 w-2/4 mb-1" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))
        ) : data && data.users ? (
          data.users.map((user: Users) => (
            <div
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className="flex items-center gap-3 p-4 hover:bg-zinc-800/50 cursor-pointer"
            >
              <Avatar>
                <AvatarImage src={user.doctorDetails?.profilePicture || "/avatar.png"} />
                <AvatarFallback>{user.doctorDetails?.name[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-100">{user.doctorDetails?.name || "Unknown"}</p>
                  {/* Add a green dot if the user is online */}
                  {onlineUsers.includes(user._id) && (
                    <span className="h-3 w-3 bg-green-500 rounded-full" title="Online"></span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 truncate">{user.lastMessage || "No messages yet"}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-zinc-400 text-sm">No users found.</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSideBar;
