import { Delete, Loader, Trash2 } from "lucide-react";
import { Slot } from "../../types/Slot";
import { useCancelSlotMutation } from "../../redux/api/doctorApi";
import ConfirmDialog from "./AlertConfirmation";

type SlotItemProps = {
  slot: Slot;
  onCancel?: (slotId: string) => void;
  isCancelLoading?: boolean;
};

const adjustUTCDateToIST = (utcDate: string | Date) => {
  const date = new Date(utcDate);
  return new Date(date.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
};

const SlotItem = ({ slot }: SlotItemProps) => {
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

  return (
    <div className="flex items-center justify-between bg-gray-800/80 rounded-lg p-3 mb-2 border border-gray-700/50">
      <div className="flex-col space-y-2">
        <p className="text-sm font-semibold text-gray-300">📅 Date: {formattedDate}</p>
        <p className="text-sm text-gray-300">
          ⏳ Slot: <span className="text-purple-400">{formattedStartTime} </span>-{" "}
          <span className="text-purple-400">{formattedEndTime}</span>
        </p>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusClass(slot.status)}`}>
          {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
        </span>
      </div>
      {slot.status === "available" && cancelSlot && (
        <ConfirmDialog
          message="Are you sure you want to cancel this slot?"
          description="Canceling this slot will make it unavailable for booking. This action cannot be undone."
          confirmText="Yes, Cancel"
          cancelText="No, Keep Slot"
          onConfirm={() => cancelSlot({ slotId: slot._id })}
          isCancelLoading={isCancelLoading}
          color="bg-red-600"
          trigger={
            <button className="text-red-400 hover:text-red-300 transition" disabled={isCancelLoading}>
             {isCancelLoading ? <Loader className="animate-spin" size={14}/> : <Trash2 size={20} />}
            </button>
          }
        />
      )}
    </div>
  );
};

export default SlotItem;
