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
