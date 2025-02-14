import { Slot } from "../../types/Slot";
import SlotItem from "./SlotItems";

type SlotListProps = {
  slots: Slot[];
  isLoading: boolean;
  onCancel?: (slotId: string) => void;
  isCanelLoading?: boolean;
};

const SlotList = ({ slots, isLoading, onCancel, isCanelLoading }: SlotListProps) => {
  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col">
      <h2 className="text-white text-lg font-semibold mb-4">Scheduled Slots</h2>
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : slots?.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">No slots available.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {slots.map((slot) => (
            <SlotItem
              key={slot._id}
              slot={slot}
              onCancel={onCancel}
              isCancelLoading={isCanelLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SlotList;