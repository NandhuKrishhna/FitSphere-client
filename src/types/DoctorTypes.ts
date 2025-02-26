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
  createdAt: string;
  updatedAt: string;
  __v: number;
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
    __v: number;
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
