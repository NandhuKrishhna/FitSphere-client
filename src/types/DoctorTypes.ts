import { Auth_User } from "./authentication.type";

export type DoctorDetails = {
  _id: string;
  doctorId: string;
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
  profilePicture: string;
  gender: string;
  professionalTitle: string;
  education?: string;
};

export type DoctorWithDetails = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  isApproved: boolean;
  role: string;
  status: string;
  doctorDetails: {
    _id: string;
    doctorId: string;
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
    profilePicture: string;
    gender: string;
    professionalTitle: string;
    createdAt: string;
    updatedAt: string;
    education?: string;
  };
};

export type DoctorApiResponse = {
  success: boolean;
  message: string;
  doctorsWithDetails: DoctorWithDetails;
};

export type DoctorwithDetails = {
  _id: string;
  name: string;
  profilePicture: string;
  doctorDetails: {
    experience: string;
    consultationFees: string;
    primarySpecialty: string;
    gender: string;
    professionalTitle: string;
    consultationLanguages: string;
  };
};



export type DoctorCardProps = {
  name: string;
  experience: string;
  specialty: string;
  profilePicture: string;
  id: string;
};

export type Rating = {
  doctorId: string;
  averageRating: number;
  totalReviews: number;
};

export type AvatarDropdownProps = {
  user: Auth_User | null;
  handleLogout: (e: React.MouseEvent) => void;
  isLoading: boolean;
};
export interface DoctorAdditionalDetails {
  doctorId: string;
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
  doctorDetails: {
    details: DoctorAdditionalDetails;
  };
}

export interface DoctorDetailsTabProps {
  doctorData?: DoctorData;
  doctorLoading: boolean;
}

export interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  step?: string;
}

export type DoctorInfo = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  isPremium: boolean;
  isVerified: boolean;
  status: string;
  isApproved: boolean;

};


export interface DoctorQueryParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  isVerified?: boolean
  isApproved?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}