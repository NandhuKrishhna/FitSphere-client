import { addWeeks, addMonths, startOfToday, format } from "date-fns";
import { Repeat, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RecurringSlotProps } from "@/types/types";


export default function RecurringSlot({
  enableRecurring,
  setEnableRecurring,
  recurrenceType,
  setRecurrenceType,
  recurrenceEndDate,
  setRecurrenceEndDate,
  selectedDate,
}: RecurringSlotProps) {
  const defaultEndDate = addWeeks(startOfToday(), 4);

  return (
    <div className="pt-2 border-t border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Repeat className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">Make this a recurring slot</span>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enableRecurring}
            onChange={() => setEnableRecurring(!enableRecurring)}
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      {enableRecurring && (
        <div className="mt-4 space-y-4 rounded-md bg-purple-900/20 border border-purple-900/50 p-3">
          <div className="flex gap-4">
            {["daily", "weekly", "monthly"].map((type) => (
              <label key={type} className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="recurrenceType"
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-purple-400 focus:ring-purple-500"
                  checked={recurrenceType === type}
                  onChange={() => setRecurrenceType(type as "daily" | "weekly" | "monthly")}
                />
                <span className="ml-2 text-sm font-medium text-gray-300 capitalize">{type}</span>
              </label>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                >
                  <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                  {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : format(defaultEndDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border border-gray-700" align="start">
                <div className="p-3">
                  <div className="text-sm text-gray-200">Select an end date</div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button
                      variant="outline"
                      className="text-xs bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                      onClick={() => setRecurrenceEndDate(addWeeks(startOfToday(), 1))}
                    >
                      +1 Week
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                      onClick={() => setRecurrenceEndDate(addWeeks(startOfToday(), 4))}
                    >
                      +4 Weeks
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                      onClick={() => setRecurrenceEndDate(addMonths(startOfToday(), 3))}
                    >
                      +3 Months
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="text-xs text-purple-400 italic">
            This will create slots on{" "}
            {recurrenceType === "daily"
              ? "every day"
              : recurrenceType === "weekly"
                ? `every ${format(selectedDate || startOfToday(), "EEEE")}`
                : `on the ${format(selectedDate || startOfToday(), "do")} of each month`}{" "}
            until {format(recurrenceEndDate || defaultEndDate, "PPP")}.
          </div>
        </div>
      )}
    </div>
  );
}
