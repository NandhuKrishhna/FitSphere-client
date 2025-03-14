
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useGetSidebarUsersQuery } from "@/redux/api/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUsers,  selectSelectedUser,  setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { getSocket } from "@/lib/socketManager";
import { useEffect } from "react";

const ChatSideBar = () => {
  const { data, isLoading , refetch } = useGetSidebarUsersQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,

  });
  const onlineUsers = useSelector(selectOnlineUsers);
  console.log(onlineUsers)
  const selectedUser = useSelector(selectSelectedUser)
 const socket = getSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (message) => {
      console.log("A new message is received", message);
      refetch();
    })
  },[refetch,socket])
  const sortedUsers = data?.users ? [...data.users] : [];

  if (selectedUser) {
    const index = sortedUsers.findIndex((user) => user._id === selectedUser._id);
    if (index !== -1) {
      const [selected] = sortedUsers.splice(index, 1);
      sortedUsers.unshift(selected);
    }
  }
  return (
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
      ) : sortedUsers.length > 0 ? (
        sortedUsers.map((user) => (
          <div
            key={user._id} 
            onClick={() => dispatch(setSelectedUser(user))}
            className={`flex items-center gap-3 p-4 hover:bg-zinc-800/50 cursor-pointer ${
              selectedUser?._id === user._id ? "bg-zinc-800" : ""
            }`}
          >
            <div className="relative w-10 h-10">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.doctorDetails?.profilePicture || "/avatar.png"} />
                <AvatarFallback>{user.doctorDetails?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 border-2 border-zinc-900 rounded-full ${
                  onlineUsers.includes(user.doctorDetails?._id) ? "bg-green-400" : "bg-gray-500"
                }`}
                title={onlineUsers.includes(user.doctorDetails?._id) ? "Online" : "Offline"}
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
  );
};

export default ChatSideBar;
