import { useSendMessagesMutation } from "@/redux/api/chatApi";
import { useState } from "react";
const useSendMessage = (selectedUserId: string | undefined) => {
  const [sendMessages, { isLoading }] = useSendMessagesMutation();
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUserId) return;
    try {
      const resposne = await sendMessages({ receiverId: selectedUserId, message }).unwrap();
      console.log(resposne);
      setMessage("");
    } catch (error) {
      console.log(error);
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
