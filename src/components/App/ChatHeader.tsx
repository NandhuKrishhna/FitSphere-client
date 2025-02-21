import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreVertical, Phone, Search, Video, X } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUsers, setSelectedUser } from "@/redux/slice/socket.ioSlice";

const ChatHeader = ({ name, id, profilePic }: { name: string; id: string; profilePic: string }) => {
  const onlineUsers = useSelector(selectOnlineUsers);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8 mr-4">
          <AvatarImage src={profilePic} />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-zinc-100 font-medium">{name}</h2>
          <p className="text-white text-sm">{onlineUsers.includes(id) ? "Online" : "Offline"}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
          <MoreVertical className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
