import toast from "react-hot-toast";
import { DayInfo } from "@/types/calories.types";

export const generateWeekDays = (startDate: Date): DayInfo[] => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        days.push({
            name: dayNames[date.getDay()],
            date: date.toISOString().split("T")[0],
            dateObj: new Date(date),
        });
    }

    return days;
};


export const handleDaySelect = (date: string, setSelectedDay: (date: string) => void) => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (date > currentDate) {
        return toast.error("Cannot select future date");
    }

    setSelectedDay(date);
};


export const getCurrentWeekStart = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;

    const weekStart = new Date(today);
    weekStart.setDate(diff);

    return weekStart;
};

export const isToday = (dateString: string): boolean => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
};
