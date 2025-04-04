import { useState, useMemo, useEffect } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarProps } from "@/types/calories.types";
import { Slot } from "@/types/DoctorDetail";

export default function ConsultationModal({
  slots, name, dept, onSlotClick }: CalendarProps) {
  const timeZone = "Asia/Kolkata";
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [visibleDatesStart, setVisibleDatesStart] = useState(0);
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
            month: format(date, "MMM", { timeZone }),
            slots: groups[isoDate].filter((s) => s.status === "available").length,
          };
        } catch (error) {
          console.error("Error processing date:", error);
          return null;
        }
      })
      .filter(Boolean) as { isoDate: string; day: string; date: string; month: string; slots: number }[];

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
    return groupedSlots[selectedDate]
      .filter((slot) => slot.status === "available" && new Date(slot.endTime) > new Date())
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [selectedDate, groupedSlots]);

  const handleSlotClick = (slot: Slot) => {
    setSelectedSlotId(slot._id);
    onSlotClick(slot);
  };

  const handlePrevDates = () => {
    setVisibleDatesStart(Math.max(0, visibleDatesStart - 1));
  };

  const handleNextDates = () => {
    if (visibleDatesStart + 4 < datesArray.length) {
      setVisibleDatesStart(visibleDatesStart + 1);
    }
  };
  const visibleDatesCount = 4;
  const visibleDates = datesArray.slice(visibleDatesStart, visibleDatesStart + visibleDatesCount);
  const hasMoreDates = visibleDatesStart + visibleDatesCount < datesArray.length;

  if (!slots) {
    return (
      <Card className="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="h-32 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Loading slots...</div>
        </CardContent>
      </Card>
    );
  }

  if (!slots.success) {
    return (
      <Card className="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="h-32 flex items-center justify-center">
          <div className="text-red-500">{slots.message || "Failed to load slots"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
      <CardHeader className="pb-2 md:pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md md:text-md font-medium">
            {"You're about to book a 30-minute consultation with"}
            <div className="font-semibold mt-1 text-sm md:text-">
              {name} ({dept})
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <button
            onClick={handlePrevDates}
            disabled={visibleDatesStart === 0}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 overflow-hidden">
            <div className="flex gap-2 justify-between px-1">
              {visibleDates.map((date) => (
                <button
                  key={date.isoDate}
                  onClick={() => setSelectedDate(date.isoDate)}
                  className={`flex-1 min-w-0 p-2 md:p-3 rounded-lg border ${selectedDate === date.isoDate
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-700"
                    }`}
                >
                  <div className="text-xs md:text-sm text-purple-600 dark:text-purple-400">{date.day}</div>
                  <div className="text-lg md:text-xl font-semibold mt-1">{date.date}</div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{date.month}</div>
                  {date.slots > 0 ? (
                    <div className="text-xs mt-1 flex items-center justify-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${date.slots > 5 ? "bg-green-500" : "bg-yellow-500"
                          } mr-1`}
                      />
                      <span className="truncate">{date.slots} slots</span>
                    </div>
                  ) : (
                    <div className="text-xs mt-1 text-red-500">No slots</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextDates}
            disabled={!hasMoreDates}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">

          <div className="">
            {filteredSlots.map((slot) => {
              const startUtc = toZonedTime(new Date(slot.startTime), "UTC");
              const endUtc = toZonedTime(new Date(slot.endTime), "UTC");

              const timeLabel = `${format(startUtc, "h:mm a", { timeZone: "UTC" })} - ${format(endUtc, "h:mm a", {
                timeZone: "UTC",
              })}`;

              return (
                <Button
                  key={slot._id}
                  variant="outline"
                  className={`justify-start font-normal lg:w-40  text-xs md:text-sm ${selectedSlotId === slot._id
                    ? "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800"
                    : "bg-purple-50/50 hover:bg-purple-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {timeLabel}
                </Button>
              );
            })}
          </div>

          {filteredSlots.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
              No available slots
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
