import { useState, useEffect } from "react";
import type { Slot } from "../../types/Slot";
import SlotItem from "./SlotItems";
import { Button } from "../../components/ui/button";
import Dropdown from "./DrpDown";
import DatePickerInput from "./DateInput";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlotListProps = {
  slots: Slot[];
  isLoading: boolean;
  onCancel?: (slotId: string) => void;
  isCancelLoading?: boolean;
};

const SlotList = ({ slots, isLoading }: SlotListProps) => {
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [consultationType, setConsultationType] = useState<"all" | "video" | "audio">("all");
  const [status, setStatus] = useState<"all" | "booked" | "available" | "cancelled">("all");
  const [date, setDate] = useState("");

  const slotsPerPage = 5;

  useEffect(() => {
    let result = slots;

    if (consultationType !== "all") {
      result = result.filter((slot) => slot.consultationType === consultationType);
    }

    if (status !== "all") {
      result = result.filter((slot) => slot.status === status);
    }

    if (date) {
      result = result.filter((slot) => new Date(slot.date).toISOString().split("T")[0] === date);
    }

    setFilteredSlots(result);
    setCurrentPage(1);
  }, [slots, consultationType, status, date]);

  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = filteredSlots.slice(indexOfFirstSlot, indexOfLastSlot);

  const totalPages = Math.ceil(filteredSlots.length / slotsPerPage);

  return (
    <div className="bg-white rounded-lg p-4 backdrop-blur-sm h-[60vh] flex flex-col">
      <h2 className="text-black text-lg font-semibold mb-4">Scheduled Slots</h2>

      <div className="flex space-x-1 mb-4">
        <Dropdown
          title="Type"
          options={[
            { label: "All", value: "all" },
            { label: "Video", value: "video" },
            { label: "Audio", value: "audio" },
          ]}
          onChange={(value) => setConsultationType(value)}
        />
        <DatePickerInput date={date} setDate={setDate} />

        <Dropdown
          title="Status"
          options={[
            { label: "All", value: "all" },
            { label: "Booked", value: "booked" },
            { label: "Available", value: "available" },
            { label: "Cancelled", value: "cancelled" },
          ]}
          onChange={(value) => setStatus(value)}
        />
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : currentSlots.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">No slots available.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {currentSlots.map((slot) => (
              <SlotItem key={slot._id} slot={slot} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="cursor-pointer"
            >
              <ChevronLeft />
            </Button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SlotList;
