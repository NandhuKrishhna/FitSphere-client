import React, { useEffect, useRef, useState } from "react";
import { Smile, Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSendMessage from "@/hooks/App/SendMessageHook";
import { useSelector } from "react-redux";
import { selectSelectedUser } from "@/redux/slice/socket.ioSlice";
import { getSocket } from "@/lib/socketManager";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import toast from "react-hot-toast";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const ChatInput: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const receiver = useSelector(selectSelectedUser);
  const selectedUserId = receiver?.doctorDetails._id;

  const { isLoading, setMessage, handleSendMessage, message } = useSendMessage(selectedUserId);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    let socket = getSocket();
  
    if (!socket || !socket.connected) {
      console.error("⚠️ Socket not connected! Retrying...");
      setTimeout(() => {
        socket = getSocket();
      }, 1000);
      return;
    }

    if (message.trim()) {
      socket.emit("typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id });
    } else {
      socket.emit("stop_typing", { senderId: currentUser?._id, receiverId: receiver?.doctorDetails._id });
    }
  }, [message]);

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

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addEmoji = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const sendMessage = () => {
    if (!message.trim() && !imagePreview) return;
    handleSendMessage(imagePreview?.toString());
    setMessage("");
    removeImage();
  };

  return (
    <div className="p-4 border-t border-zinc-800 relative">
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
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-zinc-100"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile className="h-5 w-5" />
          </Button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
        </div>

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
