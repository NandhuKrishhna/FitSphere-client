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

export type NotificationApiResponse = {
  success: boolean;
  message: string;
  allNotifications: {
    notifications: {
      _id: string;
      type: "doctor_registration" | "general" | "chat" | "appointment" | "payment";
      message: string;
      status?: "pending" | "approved" | "rejected";
      metadata?: {
        meetingId?: string;
        appointMentId?: string;
      };
      read: boolean;
      createdAt: string;
    }[];
    currentPage: number;
    totalPages: number;
    totalNotifications: number;
  };
};


export type NotificaitonQueryParams = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
  type?: string;
  date?: string
}