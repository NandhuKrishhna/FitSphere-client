import { AvatarDemo } from "@/components/App/Avatar";
import { getSocket } from "@/lib/socketManager";
import { selectOnlineUsers, selectSelectedUser, setSelectedUser } from "@/redux/slice/socket.ioSlice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ChatHeader = () => {
  const selectedUser = useSelector(selectSelectedUser)
  const onlineUsers = useSelector(selectOnlineUsers)
  const dispatch = useDispatch();
  const [typingUser, setTypingUser] = useState<string | null>(null);
    useEffect(() => {
      const socket = getSocket();
    
      if (!socket) {
        console.error("Socket not available in chat header.");
        return;
      }
    
      socket.on("typing", ({ senderId }) => {
        console.log(`User ${senderId} is typing...`);
        setTypingUser(senderId);
      });
    
      socket.on("stop_typing", ({ senderId }) => {
        console.log(`User ${senderId} stopped typing.`);
        setTypingUser(null);
      });
    
      return () => {
        socket.off("typing");
        socket.off("stop_typing");
      };
    }, []);
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AvatarDemo image={selectedUser?.doctorDetails.profilePicture} name={selectedUser?.doctorDetails.name} />

          {/* User info */}
          <div>
            <h3 className="font-medium text-white">{selectedUser?.doctorDetails.name}</h3>
            <p className="text-sm text-base-content/70">
            {typingUser ? "Typing..." :onlineUsers.includes(selectedUser!.doctorDetails!._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => dispatch(setSelectedUser(null))}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
