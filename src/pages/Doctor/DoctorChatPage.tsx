

import ChatHeader from "@/components/App/ChatHeader";
import ChatSideBar from "@/components/App/ChatSideBar";
import ChatContainer from "@/components/App/ChatContainer";
import { useSelector } from "react-redux";
import { selectMessages, selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import useSendMessage from "@/hooks/App/SendMessageHook";
import { NoUserSelectedPlaceholder } from "@/framer-motion/NoUserSelectedPlaceHolder";
import { useGetMessagesQuery } from "@/redux/api/chatApi";
import ChatInput from "@/components/App/ChatInput";
import { useState, useEffect } from "react";

export default function DoctorChatPage() {
  const selectedUser = useSelector(selectSelectedUser);
  const { isLoading, setMessage, handleSendMessage, message } = useSendMessage(selectedUser?.doctorDetails._id);
  const { isLoading: isMessageLoading } = useGetMessagesQuery(
    { receiverId: selectedUser?.doctorDetails._id },
    { skip: !selectedUser?.doctorDetails._id }
  );
  const messages = useSelector(selectMessages);
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      <div className="flex flex-1 bg-zinc-900 h-[calc(100vh-8rem)] overflow-hidden">
        <div
          className={`${isMobileView && selectedUser ? "hidden" : "block"} sm:block ${
            selectedUser ? "sm:w-80" : "w-full"
          } h-full`}
        >
          <ChatSideBar />
        </div>
        <div
          className={`flex-1 flex flex-col h-full ${isMobileView && !selectedUser ? "hidden" : "block"} ${
            !selectedUser ? "sm:flex hidden" : "flex"
          }`}
        >
          {selectedUser ? (
            <div className="flex flex-col h-full">
              <ChatHeader
                name={selectedUser.doctorDetails.name}
                profilePic={selectedUser.doctorDetails.profilePicture}
                id={selectedUser.doctorDetails._id}
                isMobileView={isMobileView}
              />
              <div className="flex-1 overflow-hidden">
                <ChatContainer
                  messages={messages}
                  selectedUser={selectedUser.doctorDetails._id}
                  isMessageLoading={isMessageLoading}
                />
              </div>
              <div className="mt-auto">
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  handleSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center h-full">
              <NoUserSelectedPlaceholder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
