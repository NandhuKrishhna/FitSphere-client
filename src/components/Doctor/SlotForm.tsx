import { useState } from "react";
import { consultationTypes, timeOptions } from "../../types/Slot";

type SlotFormProps = {
  selectedDate: {
    date: number;
    month: number;
    year: number;
  } | null;
  onSubmit: (data: {
    startTime: string;
    endTime: string;
    consultationType: string;
  }) => Promise<void>;
  isLoading: boolean;
};

const SlotForm = ({ selectedDate, onSubmit, isLoading }: SlotFormProps) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [consultationType, setConsultationType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    await onSubmit({ startTime, endTime, consultationType });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Start Time</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-black/50 text-white rounded-md p-1 text-sm border border-gray-600 h-8"
              required
            >
              <option value="">Select Start Time</option>
              {timeOptions.map((time) => (
                <option key={time.value} value={time.value}>{time.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">End Time</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-black/50 text-white rounded-md p-1 text-sm border border-gray-600 h-8"
              required
            >
              <option value="">Select End Time</option>
              {timeOptions.map((time) => (
                <option key={time.value} value={time.value}>{time.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Consultation Type</label>
          <select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            className="w-full bg-black/50 text-white rounded-md p-2 border border-gray-600"
            required
          >
            <option value="">Select Consultation Type</option>
            {consultationTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-ring loading-md"></span> : "Add Slot"}
        </button>
      </div>
    </form>
  );
};

export default SlotForm;