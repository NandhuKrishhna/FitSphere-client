import { Slot } from "@/components/App/SlotCalender";
import { IGetAppointment } from "./api/appointment-api-types";
import { SlotsResponse } from "./DoctorDetail";

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
  status: "scheduled" | "completed" | "cancelled" | "failed";
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

export interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: IGetAppointment
  role?: string
  query: AppointmentQueryParams
}


export interface AppointmentSectionProps {
  slots: SlotsResponse;
  doctorName: string;
  specialty?: string;
  handleSlotClick: (slot: Slot) => void;
  handleBookSlot: () => void;
  isLoading: boolean;
};