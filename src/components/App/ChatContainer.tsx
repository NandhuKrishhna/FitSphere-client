import { ScrollArea } from "../ui/scroll-area";
import { MessageSkeleton } from "./MessageSkeleton";
import { toIndianTime } from "@/utils/TimeAgo";
import type { MessagesData } from "@/types/ChatTypes";
import { useEffect, useRef, useState } from "react";

const ChatContainer = ({
  messages,
  selectedUser,
  isMessageLoading,
}: {
  messages: MessagesData[];
  selectedUser: string;
  isMessageLoading: boolean;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // Scroll to latest message when new message arrives
  useEffect(() => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;

      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      if (isAtBottom || !isScrolledUp) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [isScrolledUp, messages]);

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      setIsScrolledUp(scrollTop + clientHeight < scrollHeight - 100);
    }
  };

  if (isMessageLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="h-full flex-1 flex flex-col">
      {!Array.isArray(messages) || messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-zinc-400 italic">No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="relative flex-1">
          <ScrollArea className="flex-1 h-[400px] overflow-y-auto pr-4" ref={scrollAreaRef} onScroll={handleScroll}>
            <div className="space-y-4 py-4">
              {messages.map((message: MessagesData) => (
                <div
                  key={message._id}
                  className={`flex ${message.senderId === selectedUser ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === selectedUser ? "bg-violet-400 text-white" : "bg-[#6A67C1] text-purple-100"
                    }`}
                  >
                    <div className="flex gap-6">
                      <p className="text-md">{message.message}</p>
                      <span className="text-xs opacity-70 mt-1 block text-indigo-100 text-right">
                        {toIndianTime(message.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
