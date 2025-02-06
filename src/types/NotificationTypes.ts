export interface NotificationMetadata {
    newDoctorDetails?: {
      professionalTitle: string;
      primarySpecialty: string;
      experience: string;
      consultationFees: number;
      professionalEmail: string;
      contactPhoneNumber: string;
      clinicLocations: string[];
      medicalLicenseNumber: string;
      profilePicture: string;
      bio: string;
    };
  }
  
  export interface Notification {
    _id: string;
    userId: string;
    type: string;
    message: string;
    status: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    metadata?: NotificationMetadata;
  }
  
  export interface NotificationResponse {
    success: boolean;
    notification: {
      notification: Notification[];
    };
  }
  