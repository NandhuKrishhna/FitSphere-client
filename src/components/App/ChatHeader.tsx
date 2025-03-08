import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreVertical, X, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectOnlineUsers, setSelectedUser } from "@/redux/slice/socket.ioSlice";

const ChatHeader = ({
  name,
  id,
  profilePic,
  isMobileView = false,
}: {
  name: string;
  id: string;
  profilePic: string;
  isMobileView?: boolean;
}) => {
  const onlineUsers = useSelector(selectOnlineUsers);
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setSelectedUser(null));
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        {isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-zinc-100 mr-2 sm:hidden"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="mr-4">
          <AvatarImage className="rounded-full w-12 h-12" src={profilePic} />
          <AvatarFallback>{name[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-zinc-100 font-medium">{name}</h2>
          <p className="text-white text-sm">{onlineUsers.includes(id) ? "Online" : "Offline"}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
          <MoreVertical className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100 hidden sm:flex"
          onClick={handleBack}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
