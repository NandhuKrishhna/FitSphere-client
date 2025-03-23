import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NotificationDateType } from "@/pages/Test/ChatContainer";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useToast } from "../ui/toast-container";
import { getSocket } from "@/lib/socketManager";

const GlobalSocketListener = () => {
    const { addToast } = useToast()
    const currentUser = useSelector(selectCurrentUser)
    const socket = getSocket()

    useEffect(() => {
        if (!socket || !currentUser?._id) return;

        const handleNewMessage = (data: NotificationDateType) => {
            console.log("Notification received:", data);
            addToast({
                type: "success",
                message: `You have a new message from ${data.data.name}`,
                title: "New Message Notification",
            });
        };

        socket.on("newMessageNotification", handleNewMessage);

        return () => {
            socket.off("newMessageNotification", handleNewMessage);
        };
    }, [addToast, currentUser, socket]);

    return null;
};

export default GlobalSocketListener;
