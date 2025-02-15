export type AuthUser = {
  _id?: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  role?: string;
  accessToken: string; 
};


export type Doctor ={
  _id?: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  role?: string;
  accessToken: string; 
}

export type Admin = {
  _id : string;
  name : string;
  email : string;
  profilePic : string;
}

export interface DoctorRegistrationMetadata {
  doctorName?: string;
  newDoctorDetails?: {
    primarySpecialty?: string;
    bio?: string;
    experience?: number;
    consultationFees?: number;
    professionalEmail?: string;
    contactPhoneNumber?: string;
    clinicLocations?: string;
    medicalLicenseNumber?: string;
    profilePicture?: string;
    gender?:string;
    officeAddress?:string;
    consultationLanguages?:string;
    
  };
}


export interface Notification {
  _id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: DoctorRegistrationMetadata;
}
export type UserType = {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  isActive: boolean;
  isPremium: boolean;
  isVerfied: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
export type UserResponse = {
  success: boolean;
  users: UserType[];
};




