export interface Doctor {
    ProfilePicture: string;
    name: string;
  }
  
  export interface Slots {
    startTime: string;
    endTime: string;
  }
  
  export interface Appointment {
    _id: string;
    consultationType: 'video' | 'in-person';
    date: string;
    doctor: Doctor;
    status: "scheduled" | "completed" | "cancelled";
    slots: Slots;
  }
  
  export interface AppointmentResponse {
    success: boolean;
    message: string;
    response: Appointment[];
  }
  
  export interface AppointmentListProps {
    data?: AppointmentResponse;
  }