export type AuthUser = {
  _id : string;
  name : string;
  email : string;
  profilePic? : string;
}

export type Admin = {
  _id : string;
  name : string;
  email : string;
  profilePic : string;
}

interface DoctorRegistrationMetadata {
  doctorName: string;
  newDoctorDetails: {
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
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'doctor_registration';
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  metadata: DoctorRegistrationMetadata;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
