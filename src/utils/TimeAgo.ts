export const toIndianTime = (timestamp: string) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(timestamp).toLocaleString("en-IN", options);
};
