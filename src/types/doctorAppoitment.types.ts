export interface Patient {
  name: string;
  email: string;
  profilePicture: string;
}

export interface Slot {
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  consultationType: string;
  date: string;
  paymentStatus: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paymentThrough: string;
  meetingId: string;
  slot: Slot;
  patient: Patient;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AppointmentResponse {
  success: boolean;
  data: Appointment[];
  meta: Meta;
}

export interface AppointmentQueryParams {
  userId?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortField?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
}
