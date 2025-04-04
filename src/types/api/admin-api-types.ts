export interface User {
    _id: string;
    name: string;
    email: string;
    provider: string;
    isActive: boolean;
    isPremium: boolean;
    role: "user";
    isVerfied: boolean;
    status: string;
    profilePicture: string;
}

export interface GetUsersResponse {
    users: {
        users: User[];
        totalUsers: number;
        verifiedUsers: number;
        activeUsers: number;
        premiumUsers: number;
        blockedUsers: number;
        currentPage: number;
        totalPages: number;
    }
}

export interface Doctor {
    _id: string;
    name: string;
    email: string;
    provider: string;
    isActive: boolean;
    role: "doctor";
    isVerified: boolean;
    isApproved: boolean;
    status: string;
    profilePicture: string;
}
export interface GetDoctorsResponse {
    doctors: {

        doctors: Doctor[];
        totalDoctors: number;
        verifiedDoctors: number;
        activeDoctors: number;
        approvedDoctors: number;
        blockedDoctors: number;
        currentPage: number;
        totalPages: number;
        pendingDoctors: number
    }
}
export interface UpdadedUserResponse {
    updatedUser: User | Doctor;
}


export interface ISubscription {
    _id: string;
    type: string;
    planName: string;
    price: number;
    features: string[];
}

export interface ISubscriptionResponse {
    success: boolean;
    message?: string
    subscriptionPlan: ISubscription[];
}

export interface IUpdateSubscriptionResponse {
    success: boolean
    message: string
    updatedPremiumSubscription: ISubscription
}

export interface INewSubscriptionResponse {
    success: boolean
    message: string
    newPremiumSubscription: ISubscription
}


export interface IApproveDoctorResponse {
    success: boolean;
    message: string;
    newDoctor: Doctor
}