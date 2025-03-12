import { format } from "date-fns";

type DateSelectorProps = {
  dates: { date: Date; slots: number }[];
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({ dates, selectedDate, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {dates.map(({ date, slots }) => (
        <button
          key={date.toISOString()}
          onClick={() => onSelect(date)}
          className={`flex-shrink-0 w-[72px] p-3 rounded-lg border ${
            selectedDate?.toISOString() === date.toISOString()
              ? "border-purple-500 bg-purple-900/30 text-white"
              : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-purple-500 hover:bg-gray-700/50"
          }`}
        >
          <div className="text-sm text-purple-400">{format(date, "EEE")}</div>
          <div className="text-xl font-semibold mt-1">{format(date, "d")}</div>
          {slots > 0 && (
            <div className="text-xs mt-1 text-gray-300">
              <span
                className={`inline-block w-2 h-2 rounded-full ${slots > 5 ? "bg-green-500" : "bg-yellow-500"} mr-1`}
              />
              {slots} slots
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default DateSelector;
