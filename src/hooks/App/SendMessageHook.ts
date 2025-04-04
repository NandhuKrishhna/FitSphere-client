
import { useToast } from "@/components/ui/toast-container";
import { useSendMessagesMutation } from "@/redux/api/chatApi";
import { useState } from "react";
import { ErrorResponse } from "react-router-dom";

const useSendMessage = (selectedUserId: string | undefined) => {
  const [sendMessages, { isLoading }] = useSendMessagesMutation();
  const [message, setMessage] = useState("");
  const { addToast } = useToast()
  const handleSendMessage = async (image?: string) => {
    if (!message.trim() && !image) return;
    if (!selectedUserId) return;

    try {
      const response = await sendMessages({
        receiverId: selectedUserId,
        message: message.trim(),
        image
      }).unwrap();
      console.log(response)
      setMessage("");
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.data.message) {
        addToast({
          type: "warning",
          message: err.data.message,
          title: "Warning"
        })
        return;
      }

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
