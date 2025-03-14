import { useSendMessagesMutation } from "@/redux/api/chatApi";
import { useState } from "react";

const useSendMessage = (selectedUserId: string | undefined) => {
  const [sendMessages, { isLoading }] = useSendMessagesMutation();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (image?: string) => {
    if (!message.trim() && !image) return;
    if (!selectedUserId) return;

    try {
      const response = await sendMessages({ 
        receiverId: selectedUserId, 
        message: message.trim(), 
        image 
      }).unwrap();

      console.log(response);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSendMessage,
    isLoading,
    setMessage,
    message,
  };
};

export default useSendMessage;
