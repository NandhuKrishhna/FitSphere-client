export type Review = {
  _id: string;
  userId: string;
  doctorId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  userDetails?: {
    _id: string;
    name: string;
    profilePicture: string;
  };
};

export type MenuItem = {
  id: string;
  label: string;
};

export type DoctorDetails = {
  _id: string;
  name: string;
  profilePicture?: string;
  details?: {
    primarySpecialty?: string;
    experience?: number;
    consultationFees?: number;
    contactPhoneNumber?: string;
    professionalEmail?: string;
    bio?: string;
    consultationLanguages?: string;
  };
};
export type Slot = {
  _id: string;
  doctorId: string;
  patientId?: string;
  consultationType: string;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type SlotsResponse = {
  slots: Slot[];
  success: boolean;
  message: string;
};


export type DoctorProfileProps = {
  doctorDetails: DoctorDetails;
  averageRating: number;
  totalReviews: number;
};


