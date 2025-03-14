import { useEffect, useRef, useState } from "react";
import { Smile, Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSocket } from "@/lib/socketManager";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import toast from "react-hot-toast";

const socket = getSocket();
console.log(socket)

type ChatInputProps = {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: (image?: string) => void;
  isLoading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, handleSendMessage, isLoading }) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentUser = useSelector(selectCurrentUser);
  const receiver = useSelector(selectSelectedUser);
  
  useEffect(() => {
    let socket = getSocket();
  
  if (!socket || !socket.connected) {
    console.error("⚠️ Socket not connected! Retrying...");
    setTimeout(() => {
      socket = getSocket();
      if (socket?.connected) {
        console.log("✅ Socket connected after retry.");
      }
    }, 1000);
    return;
  }

  if (message.trim()) {
    socket.emit("typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id });
    console.log("Typing...");
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      socket?.emit("stop_typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id });
    }, 1000);

    setTypingTimeout(timeout);
  } else {
    socket.emit("stop_typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id });
  }

  return () => {
    if (typingTimeout) clearTimeout(typingTimeout);
  };
}, [message]);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Remove Image Preview
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Send Message with Image
  const sendMessage = () => {
    if (!message.trim() && !imagePreview) return;
    handleSendMessage(imagePreview?.toString());
    setMessage("");
    removeImage();
  };

  return (
    <div className="p-4 border-t border-zinc-800">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
          <Smile className="h-5 w-5" />
        </Button>

        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
          onClick={() => fileInputRef.current?.click()}
        >
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
          disabled={!message.trim() && !imagePreview || isLoading}
          onClick={sendMessage}
        >
          {isLoading ? <span className="loading loading-spinner loading-xs"></span> : <Send className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
