import { Smile, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, handleSendMessage, isLoading }) => {
  return (
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
          disabled={!message.trim() || isLoading}
          onClick={handleSendMessage}
        >
          {isLoading ? <span className="loading loading-spinner loading-xs"></span> : <Send className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
