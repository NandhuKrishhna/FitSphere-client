export const consultationTypes = [
    { value: "video", label: "Video Consultation" },
    { value: "audio", label: "Audio Consultation" },
  ] as const;
  export const generateTimeOptions = () => {
    const options = [];
    const startHour = 9; 
    const endHour = 21; 
    const interval = 30;
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        const time24 = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        const period = hour >= 12 ? "PM" : "AM";
        const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const time12 = `${adjustedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
        options.push({ value: time24, label: time12 });
      }
    }
  
    return options;
  };
  
  export const timeOptions = generateTimeOptions();


  export type Slot = {
    _id: string;
    doctorId: string;
    consultationType: "video" | "audio";
    date: string; 
    startTime: string;
    endTime: string;
    status: "booked" | "available" | "cancelled"; 
    createdAt: string; 
    updatedAt: string; 
    __v: number;
  };


export type CalendarDate = {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
};