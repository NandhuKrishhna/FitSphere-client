export interface IAppointment {
    _id: string;
    doctorId: string;
    patientId: string;
    slotId: string;
    consultationType: "video" | "audio" | "chat";
    date: string;
    paymentStatus: "pending" | "completed" | "failed";
    paymentId?: string;
    amount: number;
    status: "scheduled" | "completed" | "cancelled" | "failed";
    meetingId?: string;
    orderId?: string;
    paymentMethod?: string;
    paymentThrough?: string;
    description?: string;
    bank?: string;
}

export interface ICancelledAppointmentResponse {
    success: boolean;
    message: string;
    response: IAppointment
}



export interface IAppointmentApiResponse {
    success: boolean;
    message: string;
    data: IGetAppointment[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export enum ConsultationType {
    VIDEO = "video",
    AUDIO = "audio",
    CHAT = "chat",
}

export enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
}

export enum AppointmentStatus {
    SCHEDULED = "scheduled",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    FAILED = "failed",
}

export interface IGetAppointment {
    _id: string;
    consultationType: ConsultationType;
    date: string;
    paymentStatus: PaymentStatus;
    amount: number;
    status: AppointmentStatus;
    meetingId?: string;
    paymentMethod?: string;
    paymentThrough?: string;
    slot: {
        startTime: string;
        endTime: string;
    };
    otherUser: {
        name: string;
        email: string;
        profilePicture: string;
    };
}
