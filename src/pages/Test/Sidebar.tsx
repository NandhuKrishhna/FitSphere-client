import { Users, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSidebarUsersQuery } from "@/redux/api/chatApi";
import { selectOnlineUsers, selectSelectedUser, setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { getSocket } from "@/lib/socketManager";
import SidebarSkeleton from "./SidebarSkeleton";
import { AvatarDemo } from "@/components/App/Avatar";
import { ISidebarUsers } from "@/types/api/chat-api-types";

const ChatSideBar = () => {
  const { data, isLoading, refetch } = useGetSidebarUsersQuery(undefined);
  const dispatch = useDispatch();
  const onlineUsers = useSelector(selectOnlineUsers);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const socket = getSocket();
  const selectedUserId = useSelector(selectSelectedUser)?.doctorDetails?._id;


  useEffect(() => {
    socket?.on("newMessage", () => {
      refetch();
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, refetch]);
  useEffect(() => {
    if (selectedUserId) {
      refetch();
    }
  }, [selectedUserId]);

  const sortedUsers = data?.users ? [...data.users] : [];

  if (selectedUserId) {
    const index = sortedUsers.findIndex((user) => user.doctorDetails?._id === selectedUserId);
    if (index !== -1) {
      const [selected] = sortedUsers.splice(index, 1);
      sortedUsers.unshift(selected);
    }
  }
  const filteredUsers = sortedUsers.filter((user) => {
    const meetsOnlineFilter = showOnlineOnly ? onlineUsers.includes(user.doctorDetails?._id) : true;

    const meetsSearchFilter = searchTerm
      ? user.doctorDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return meetsOnlineFilter && meetsSearchFilter;
  });

  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-indigo-400" />
          <span className="font-medium text-indigo-400 hidden lg:block">Contacts</span>
        </div>

        {/* Search input - visible in both mobile and desktop */}
        <div className="mt-3 relative hidden lg:block">
          <div className="flex items-center w-full border border-base-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-1 px-3 bg-transparent text-sm focus:outline-none text-white"
            />
            <button className="p-2 bg-base-300">
              <Search className="size-4 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Online filters - visible only on desktop */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm text-indigo-400">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: ISidebarUsers) => (
            <button
              key={user?.doctorDetails?._id}
              onClick={() =>
                dispatch(setSelectedUser({ ...user, lastMessage: user.lastMessage ?? '' }))}
              className={`w-full p-3 flex items-center justify-between gap-3 hover:bg-base-300 transition-colors ${user.doctorDetails?._id === selectedUserId ? "bg-base-200" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AvatarDemo image={user.doctorDetails?.profilePicture} name={user.doctorDetails?.name} />
                  {onlineUsers.includes(user.doctorDetails?._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium text-white truncate">{user.doctorDetails?.name || "Unknown"}</div>
                  <p className="text-sm text-zinc-400 truncate">{user.lastMessage?.slice(0, 30) || "No messages yet"}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">
            {searchTerm ? "No users found matching your search" : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSideBar;