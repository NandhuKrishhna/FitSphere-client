interface Doctor {
  name: string;
  profilePicture: string;
}

interface Slots {
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  consultationType: "video" | "in-person";
  date: string;
  doctor: Doctor;
  status: "scheduled" | "completed" | "cancelled" |"failed";
  slot: Slots;
  amount: number;
  orderId: string;
  paymentMethod: string;
  paymentThrough: string;
  paymentStatus?: "pending" | "completed" | "failed";
  meetingId?: string;
}
export interface AppointmentQueryParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  paymentStatus?: string
  consultationType?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}