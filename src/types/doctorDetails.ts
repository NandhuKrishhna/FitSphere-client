export type DoctorDetailsParams = {
    bio?: string;
    experience?: string;
    consultationFees?: string;
    contactPhoneNumber?: string;
    professionalEmail?: string;
    officeAddress?: string;
    clinicLocations?: string;
    consultationLanguages?: string;
    primarySpecialty?: string;
    medicalLicenseNumber?: string;
    profilePicture?: string;
    gender?: string;
    professionalTitle?: string;
    certificate?: string;
  };

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
    _id: string;
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
  