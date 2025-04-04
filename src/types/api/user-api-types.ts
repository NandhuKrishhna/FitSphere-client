import { HealthDetails } from "../types";

export interface IGetUserHealthDetails {
    success: boolean;
    message: string;
    userHealthDetails: HealthDetails
};
export interface IUpdateUserHealthDetails {
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    activityLevel?: string;
    goal?: string;
    targetWeight?: number;
    weeksToGoal?: number;
    targetDailyCalories?: number;
};
export interface IUpdateUserHealthDetailsResponse {
    success: boolean;
    message: string;
}