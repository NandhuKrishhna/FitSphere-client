import { XCircle } from "lucide-react";
import { Slot } from "../../types/Slot";

type SlotItemProps = {
  slot: Slot;
  onCancel?: (slotId: string) => void;
  isCancelLoading?: boolean
};

const adjustUTCDateToIST = (utcDate: string | Date) => {
  const date = new Date(utcDate);
  return new Date(date.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
};

const SlotItem = ({ slot, onCancel , }: SlotItemProps) => {
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
  
  return (
    <div className="flex items-center justify-between bg-black/50 text-white rounded-md p-3 mb-2">
      <div className="flex-col space-y-2">
        <p className="text-sm font-semibold">📅 Date: {formattedDate}</p>
        <p className="text-sm">⏳ Slot: {formattedStartTime} - {formattedEndTime}</p>
        <p className={`text-xs pl-1 ${slot.status === "booked" ? "text-red-400" : "text-green-400"}`}>
          {slot.status === "booked" ? "Booked" : "Available"}
        </p>
      </div>
      {slot.status === "available" && onCancel && (
        <button
          onClick={() => onCancel(slot._id)}
          className="text-red-400 hover:text-red-600 transition"
        >
         <XCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default SlotItem;