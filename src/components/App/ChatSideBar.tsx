import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useGetSidebarUsersQuery } from "@/redux/api/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUsers, selectUsers, setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { SelectedUser } from "@/types/ChatTypes";

const ChatSideBar = () => {
  const { data, isLoading } = useGetSidebarUsersQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const users = useSelector(selectUsers);
  console.log("Users from redux", users);
  console.log("Data for sidebar : ", data);
  const dispatch = useDispatch();
  // console.log("sidebar , users", data);
  const onlineUsers = useSelector(selectOnlineUsers);
  console.log(onlineUsers);
  console.log("From user ChatSidebar", data);
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
          data.users?.map((user: SelectedUser) => (
            <div
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className="flex items-center gap-3 p-4 hover:bg-zinc-800/50 cursor-pointer"
            >
              <div className="relative w-10 h-10">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.doctorDetails?.profilePicture || "/avatar.png"} />
                  <AvatarFallback>{user.doctorDetails?.name[0] || "U"}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 border-2 border-zinc-900 rounded-full ${
                    onlineUsers.includes(user.doctorDetails._id) ? "bg-green-400" : "bg-gray-500"
                  }`}
                  title={onlineUsers.includes(user.doctorDetails._id) ? "Online" : "Offline"}
                ></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-100">{user.doctorDetails?.name || "Unknown"}</p>
                <p className="text-sm text-zinc-400 truncate">{user.lastMessage?.slice(0, 30) || "No messages yet"}</p>
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
