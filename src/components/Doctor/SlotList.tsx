
import { Slot } from "../../types/Slot";
import SlotItem from "./SlotItems";

type SlotListProps = {
  slots: Slot[];
  isLoading: boolean;
  onCancel?: (slotId: string) => void;
  isCanelLoading?: boolean
};

const SlotList = ({ slots, isLoading, onCancel , isCanelLoading }: SlotListProps) => {
  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center h-full">
      <h2 className="text-white text-lg font-semibold mb-4">Scheduled Slots</h2>
      {isLoading ? (
        <span className="loading loading-ring loading-md"></span>
      ) : slots?.length === 0 ? (
        <p className="text-gray-400">No slots available.</p>
      ) : (
        <div className="w-full max-h-[400px] overflow-y-auto">
          {slots.map((slot) => (
            <SlotItem key={slot._id} slot={slot} onCancel={onCancel} isCancelLoading={isCanelLoading} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SlotList;