import { useEffect, useRef } from "react";
import {  useSelector } from "react-redux";
import {  selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import { formatMessageTime } from "./time";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import ChatHeader from "./ChatHeader";
import { useGetMessagesQuery } from "@/redux/api/chatApi";
import { getSocket } from "@/lib/socketManager";

export type MessageType = {
  createdAt : string,
  isRead : false,
  message : string, 
  receiverId : string,
  senderId : string,
  _id: string,
  image?:string
}
const socket = getSocket();
// console.log(socket)
const ChatContainer = () => {
  const selectedUser = useSelector(selectSelectedUser);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const authUser = useSelector(selectCurrentUser)
   const { data: messages,  isLoading: isMessageLoading , refetch } = useGetMessagesQuery({
    receiverId: selectedUser?.doctorDetails._id,
  });
  
 useEffect(() => {
    socket?.on("newMessage", (message) => {
      console.log("New message received:", message);
      refetch();
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [refetch]);
  
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.messages?.map((message : MessageType) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-8 rounded-full border">
                <img
                 src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePicture || "/avatar.png"
                      : selectedUser?.doctorDetails.profilePicture || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.message && <p>{message.message}</p>}
              <span className="text-xs text-gray-400 mt-1 self-end">
  {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
</span>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

