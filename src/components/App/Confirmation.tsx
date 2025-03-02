import { useState, useMemo, useEffect } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Slot } from "./SlotCalender";

interface CalendarProps {
  name?: string;
  dept: string;
  slots?: {
    success: boolean;
    message: string;
    slots: Slot[];
  };
  onSlotClick: (slot: Slot) => void;
}

export default function ConsultationModal({ slots, name, dept, onSlotClick }: CalendarProps) {
  const timeZone = "Asia/Kolkata";
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // Safely process slots data
  const { datesArray, groupedSlots } = useMemo(() => {
    const groups: { [key: string]: Slot[] } = {};
    const safeSlots = slots?.slots || [];

    safeSlots.forEach((slot) => {
      try {
        const dateKey = format(new Date(slot.date), "yyyy-MM-dd", { timeZone });
        groups[dateKey] = groups[dateKey] || [];
        groups[dateKey].push(slot);
      } catch (error) {
        console.error("Error processing slot:", error);
      }
    });

    const dates = Object.keys(groups)
      .map((isoDate) => {
        try {
          const date = new Date(isoDate);
          return {
            isoDate,
            day: format(date, "EEE", { timeZone }),
            date: format(date, "d", { timeZone }),
            slots: groups[isoDate].filter((s) => s.status === "available").length,
          };
        } catch (error) {
          console.error("Error processing date:", error);
          return null;
        }
      })
      .filter(Boolean) as { isoDate: string; day: string; date: string; slots: number }[];

    return {
      datesArray: dates,
      groupedSlots: groups,
    };
  }, [slots?.slots]);

  useEffect(() => {
    if (datesArray.length > 0 && !selectedDate) {
      setSelectedDate(datesArray[0]?.isoDate || null);
    }
  }, [datesArray, selectedDate]);

  const filteredSlots = useMemo(() => {
    if (!selectedDate || !groupedSlots[selectedDate]) return [];
    return groupedSlots[selectedDate].filter(
      (slot) => slot.status === "available" && new Date(slot.endTime) > new Date()
    );
  }, [selectedDate, groupedSlots]);

  const handleSlotClick = (slot: Slot) => {
    setSelectedSlotId(slot._id);
    onSlotClick(slot);
  };

  if (!slots) {
    return (
      <Card className="w-[440px] bg-white">
        <CardContent className="h-32 flex items-center justify-center">
          <div className="text-gray-500">Loading slots...</div>
        </CardContent>
      </Card>
    );
  }

  if (!slots.success) {
    return (
      <Card className="w-[440px] bg-white">
        <CardContent className="h-32 flex items-center justify-center">
          <div className="text-red-500">{slots.message || "Failed to load slots"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[440px] bg-white">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {"You're about to book a 30-minute consultation with"}
            <div className="font-semibold mt-1">
              {name} ({dept})
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 overflow-x-auto pb-4">
          {datesArray.map((date) => (
            <button
              key={date.isoDate}
              onClick={() => setSelectedDate(date.isoDate)}
              className={`flex-shrink-0 w-[72px] p-3 rounded-lg border ${
                selectedDate === date.isoDate
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-500"
              }`}
            >
              <div className="text-sm text-purple-600">{date.day}</div>
              <div className="text-xl font-semibold mt-1">{date.date}</div>
              {date.slots > 0 ? (
                <div className="text-xs mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      date.slots > 5 ? "bg-green-500" : "bg-yellow-500"
                    } mr-1`}
                  />
                  {date.slots} slots
                </div>
              ) : (
                <div className="text-xs mt-1 text-red-500">No slots</div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="indian">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Indian Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-500">30 min meeting</div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {filteredSlots.map((slot) => {
              const start = toZonedTime(new Date(slot.startTime), timeZone);
              const end = toZonedTime(new Date(slot.endTime), timeZone);
              const timeLabel = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;

              return (
                <Button
                  key={slot._id}
                  variant="outline"
                  className={`justify-start font-normal ${
                    selectedSlotId === slot._id
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-purple-50/50 hover:bg-purple-100"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {timeLabel}
                </Button>
              );
            })}
          </div>

          {filteredSlots.length === 0 && selectedDate && (
            <div className="text-center text-gray-500 mt-4">No available slots for this date</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
