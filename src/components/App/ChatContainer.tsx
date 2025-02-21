import { ScrollArea } from "../ui/scroll-area";
import { MessageSkeleton } from "./MessageSkeleton";
import { toIndianTime } from "@/utils/TimeAgo";
import { Messages, MessagesData } from "@/types/ChatTypes";

const ChatContainer = ({
  messages,
  selectedUser,
  isMessageLoading,
}: {
  messages: MessagesData | null;
  selectedUser: string;
  isMessageLoading: boolean;
}) => {
  if (isMessageLoading) {
    return <MessageSkeleton />;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <ScrollArea className="flex-1 p-4 flex items-center justify-center">
        <p className="text-sm text-zinc-400 ">No messages yet. Start the conversation!</p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="h-full space-y-4 overflow-y-auto">
        {messages.map((message: Messages) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === selectedUser ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === selectedUser ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-100"
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <span className="text-xs opacity-70 mt-1 block text-right">{toIndianTime(message.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatContainer;
