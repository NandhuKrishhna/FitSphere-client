import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreVertical, Phone, Search, Video } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { selectOnlineUsers } from "@/redux/slice/socket.ioSlice";

const ChatHeader = ({ name, id }: { name: string; id: string }) => {
  const onlineUsers = useSelector(selectOnlineUsers);
  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
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
      </div>
    </div>
  );
};

export default ChatHeader;
