import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ChatHeader from "@/components/App/ChatHeader";
import ChatSideBar from "@/components/App/ChatSideBar";
import { Paperclip, Send, Smile } from "lucide-react";
import ChatContainer from "@/components/App/ChatContainer";
import { useSelector } from "react-redux";
import { selectOnlineUsers, selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import useSendMessage from "@/hooks/App/SendMessageHook";
import { NoUserSelectedPlaceholder } from "@/framer-motion/NoUserSelectedPlaceHolder";
import { useGetMessagesQuery } from "@/redux/api/chatApi";

export default function ChatPage() {
  const selectedUser = useSelector(selectSelectedUser);
  const { isLoading, setMessage, handleSendMessage, message } = useSendMessage(selectedUser?.doctorDetails._id);
  const { data, isLoading: isMessageLoading } = useGetMessagesQuery({ receiverId: selectedUser?.doctorDetails._id });
  // console.log(selectedUser);
  const onlineUsers = useSelector(selectOnlineUsers);
  console.log(onlineUsers);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 bg-zinc-900">
        <ChatSideBar />
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <ChatHeader name={selectedUser.doctorDetails.name} id={selectedUser.doctorDetails._id} />
              <div className="flex-1 overflow-auto">
                <ChatContainer
                  data={data}
                  selectedUser={selectedUser.doctorDetails._id}
                  isMessageLoading={isMessageLoading}
                />
              </div>
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message"
                    className="bg-zinc-800 border-none text-zinc-100"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-zinc-100"
                    disabled={!message.trim() || isLoading}
                    onClick={handleSendMessage}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <NoUserSelectedPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}
