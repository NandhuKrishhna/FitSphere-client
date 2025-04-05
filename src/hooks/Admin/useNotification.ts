import { useApproveRequestMutation, useGetNotificationQuery, useRejectRequestMutation } from "@/redux/api/adminApi";
import { Notification } from "@/types/auth.types";
import { useState } from "react";
import toast from "react-hot-toast";

const useNotification = () => {
    const { data, isLoading, isError } = useGetNotificationQuery(undefined)
    const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation()
    const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation()
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")
    const [filter, setFilter] = useState("all")
    console.log("Notification data:", data)
    const handleNotificationClick = (notification: Notification) => {
        setSelectedNotification(notification)
    }

    const handleCloseDetails = () => {
        setSelectedNotification(null)
    }

    const handleApprove = async () => {
        if (selectedNotification) {
            try {
                await approveRequest({ id: selectedNotification.userId }).unwrap()
                toast.success("Request approved successfully")
                setIsOpen(false)
                setSelectedNotification(null)
            } catch (error) {
                console.error("Error approving request:", error)
            }
        }
    }

    const handleReject = async (userId: string) => {
        if (selectedNotification && rejectionReason.trim()) {
            try {
                await rejectRequest({ id: selectedNotification.userId, userId, reason: rejectionReason }).unwrap()
                toast.success("Request rejected and email sent successfully")
                setIsRejectModalOpen(false)
                setIsOpen(false)
                setRejectionReason("")
                setSelectedNotification(null)
            } catch (error) {
                console.error("Error rejecting request:", error)
            }
        } else {
            toast.error("Please enter a rejection reason")
        }
    }

    const filteredNotifications = data?.notification
        ? filter === "all"
            ? data.notification
            : data.notification.filter((notif: Notification) => !notif.read)
        : []

    // And for unreadCount:
    const unreadCount = data?.notification
        ? data.notification.filter((notif: Notification) => !notif.read).length
        : 0
    return {
        data,
        isLoading,
        isError,
        rejectRequest,
        isRejecting,
        approveRequest,
        isApproving,
        selectedNotification,
        setSelectedNotification,
        isOpen,
        setIsOpen,
        isRejectModalOpen,
        setIsRejectModalOpen,
        rejectionReason,
        setRejectionReason,
        handleNotificationClick,
        handleCloseDetails,
        handleApprove,
        handleReject,
        filteredNotifications,
        unreadCount,
        setFilter,
        filter
    }
};
export default useNotification;