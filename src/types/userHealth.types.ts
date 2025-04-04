
export interface User {
  id?: string;
  name?: string;
  email?: string;
  profilePicture?: string;
}

// Health related types
export interface HealthDetails {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  targetWeight: number;
  weeksToGoal: number;
  targetDailyCalories?: number;
}

export interface HealthData {
  userHealthDetails: HealthDetails;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface WeightData {
  weightProgress: WeightEntry[];
}


export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ProfilePicUploadRequest {
  profilePic: string;
}

export interface ProfilePicUploadResponse {
  profilePicture: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}



export interface UpdateHealthDetailsResponse {
  userHealthDetails: HealthDetails;
}

export type NumberScrollerProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
  visibleItems?: number;
};


