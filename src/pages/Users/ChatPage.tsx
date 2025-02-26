import ChatHeader from "@/components/App/ChatHeader";
import ChatSideBar from "@/components/App/ChatSideBar";
import ChatContainer from "@/components/App/ChatContainer";
import { useSelector } from "react-redux";
import { selectMessages, selectOnlineUsers, selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import useSendMessage from "@/hooks/App/SendMessageHook";
import { NoUserSelectedPlaceholder } from "@/framer-motion/NoUserSelectedPlaceHolder";
import { useGetMessagesQuery } from "@/redux/api/chatApi";
import Header from "../../components/Header";
import ChatInput from "@/components/App/ChatInput";
export default function DoctorChatPage() {
  const selectedUser = useSelector(selectSelectedUser);
  const { isLoading, setMessage, handleSendMessage, message } = useSendMessage(selectedUser?.doctorDetails._id);
  const { isLoading: isMessageLoading } = useGetMessagesQuery(
    { receiverId: selectedUser?.doctorDetails._id },
    { skip: !selectedUser?.doctorDetails._id }
  );
  const onlineUsers = useSelector(selectOnlineUsers);
  const messages = useSelector(selectMessages);
  console.log("Messages", messages);
  console.log(onlineUsers);
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />

      <div className="flex flex-1 bg-zinc-900">
        <ChatSideBar />
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <ChatHeader
                name={selectedUser.doctorDetails.name}
                profilePic={selectedUser.doctorDetails.profilePicture}
                id={selectedUser.doctorDetails._id}
              />
              <div className="flex-1 overflow-auto">
                <ChatContainer
                  messages={messages}
                  selectedUser={selectedUser.doctorDetails._id}
                  isMessageLoading={isMessageLoading}
                />
              </div>
              <ChatInput
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </>
          ) : (
            <NoUserSelectedPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}
