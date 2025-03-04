import { format, toZonedTime } from "date-fns-tz";

export const formatToIndianTime = (utcTime: string) => {
  const zonedDate = toZonedTime(utcTime, "UTC"); // Keep it in UTC
  return format(zonedDate, "hh:mm a"); // Format without conversion
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};
