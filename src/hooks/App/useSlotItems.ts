import { useCancelSlotMutation } from "@/redux/api/doctorApi";
import { SlotItemProps } from "@/types/types";

const useSlotItems = ({ slot }: SlotItemProps) => {
    const adjustUTCDateToIST = (utcDate: string | Date) => {
        const date = new Date(utcDate);
        return new Date(date.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
    };
    const [cancelSlot, { isLoading: isCancelLoading }] = useCancelSlotMutation();
    const adjustedDate = adjustUTCDateToIST(slot.date);
    const formattedDate = adjustedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const adjustedStartTime = adjustUTCDateToIST(slot.startTime);
    const formattedStartTime = adjustedStartTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    });

    const adjustedEndTime = adjustUTCDateToIST(slot.endTime);
    const formattedEndTime = adjustedEndTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    });

    const getStatusClass = (status: string) => {
        switch (status) {
            case "booked":
                return "bg-red-900/30 text-red-400";
            case "available":
                return "bg-green-900/30 text-green-400";
            case "cancelled":
                return "bg-gray-800/50 text-gray-400";
            case "completed":
                return "bg-blue-900/30 text-blue-400";
            case "expired":
                return "bg-yellow-900/30 text-yellow-400";
            default:
                return "bg-gray-800/50 text-gray-400";
        }
    };
    return {
        formattedDate,
        formattedStartTime,
        formattedEndTime,
        getStatusClass,
        isCancelLoading,
        cancelSlot
    }
}

export default useSlotItems