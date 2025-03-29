import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NotificationDateType } from "@/pages/Test/ChatContainer";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { useToast } from "../ui/toast-container";
import { getSocket } from "@/lib/socketManager";
import { useGetAllNotificationQuery } from "@/redux/api/appApi";
import { useLogout } from "@/hooks/userLogoutHook";
import { useDoctorLogout } from "@/hooks/DoctorHooks/doctorLogoutHook";
import { Roles } from "@/utils/Enums";
export type NotificationType = {
    message: string;
};

const GlobalSocketListener = () => {
    const { refetch } = useGetAllNotificationQuery({});
    const { addToast } = useToast()
    const currentUser = useSelector(selectCurrentUser)
    const socket = getSocket()
    const { handleLogout } = useLogout();
    const { handleDoctorLogout } = useDoctorLogout();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!socket || !currentUser?._id) return;

        const handleNewMessage = (data: NotificationDateType) => {
            addToast({
                type: "success",
                message: `You have a new message from ${data.data.name}`,
                title: "New Message Notification",
            });
        };
        const handleNewMessageNotification = (data: NotificationType) => {
            addToast({
                type: "info",
                message: data.message,
                title: "New Notification",
            })
            refetch()
        }
        const handleSuspend = (data: NotificationType) => {
            addToast({
                type: "warning",
                message: data.message,
                title: "Suspend Notification",
            })
            setTimeout(() => {
                if (user?.role === Roles.USER) {
                    handleLogout();
                } else {
                    handleDoctorLogout();
                }
            }, 2000)
        }

        socket.on("newMessageNotification", handleNewMessage);
        socket.on("new-notification", handleNewMessageNotification);
        socket.on("suspend-notification", handleSuspend);

        return () => {
            socket.off("newMessageNotification", handleNewMessage);
            socket.off("new-notification", handleNewMessageNotification);
            socket.off("suspend-notification", handleSuspend);
        };
    }, [addToast, currentUser, handleDoctorLogout, handleLogout, refetch, socket, user?.role]);

    return null;
};

export default GlobalSocketListener;
