import { Loader, Trash2 } from "lucide-react";
import ConfirmDialog from "./AlertConfirmation";
import { SlotItemProps } from "@/types/types";
import useSlotItems from "@/hooks/App/useSlotItems";



const SlotItem = ({ slot }: SlotItemProps) => {
  const {
    formattedDate,
    formattedStartTime,
    formattedEndTime,
    getStatusClass,
    cancelSlot,
    isCancelLoading
  } = useSlotItems({ slot });

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
              {isCancelLoading ? <Loader className="animate-spin" size={14} /> : <Trash2 size={20} />}
            </button>
          }
        />
      )}
    </div>
  );
};

export default SlotItem;
