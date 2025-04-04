import { Review } from "./types";


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

export interface DoctorDetailsResponse {
  success: boolean;
  message: string;
  doctorDetails: DoctorDetails;
}

export interface DoctorDetails {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  status: string;
  profilePicture: string;
  details: DoctorAdditionalDetails;
}

export interface DoctorAdditionalDetails {
  bio: string;
  experience: string;
  consultationFees: string;
  contactPhoneNumber: string;
  professionalEmail: string;
  officeAddress: string;
  clinicLocations: string;
  consultationLanguages: string;
  primarySpecialty: string;
  medicalLicenseNumber: string;
  gender: string;
  professionalTitle: string;
}

export interface DoctorData {
  doctorDetails: DoctorDetails;
}

export interface DoctorDetailsTabProps {
  doctorData?: DoctorData;
  doctorLoading: boolean;
}

export type InfoTabsProps = {
  activeSection: string
  setActiveSection: (section: string) => void
  doctorDetails: DoctorDetails
  reviews: Review[]
  renderTabContent: boolean
  doctorName: string
}
