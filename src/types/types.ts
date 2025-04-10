import { ReactNode } from "react";
import { SourceProps } from "react-player/base";
import { WalletTransactionQuery } from "./wallet.types";

export type Option<T extends string> = {
    id: T;
    title: string;
    description?: string;
    icon?: React.ReactNode;
};

export type OptionSelectorProps<T extends string> = {
    options: Option<T>[];
    selectedValue: T | null;
    onChange: (value: T) => void;
    layout?: "grid" | "flex";
};


export interface OTPVerificationLayoutProps {
    title?: string;
    subtitle?: string;
    onSubmit: (e: React.FormEvent) => void | Promise<void>;
    otp: string[];
    setOtp: (otp: string[]) => void;
    isLoading: boolean;
    email?: string;
    handleResendOtp?: (email: string) => Promise<string | undefined>;
    footerComponent?: ReactNode;
    submitButtonText?: string;
    otpLength?: number;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface PaymentOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectWallet: () => void;
    onSelectRazorpay: () => void;
    amount: number;
}


export type Props = {
    url: string | MediaStream | string[] | SourceProps[] | undefined;
    muted: boolean;
    playing: boolean;
    width?: string;
    height?: string;
    showUserIcon?: boolean;
};

export interface ProfileHeaderProps {
    name?: string;
    email?: string;
    profilePicture?: string;
}


export interface User {
    name?: string;
    email?: string;
    profilePicture?: string;
}

export interface HealthDetails {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goal: string;
    targetWeight: number;
    weeksToGoal: number;
    targetDailyCalories: number;
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

export interface OverviewTabProps {
    auth: User | null;
    healthData?: HealthData;
    healthLoading: boolean;
    weightData?: WeightData;
    weightLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscriptionDetails?: any
    subscriptionLoading?: boolean
}
export interface ProfileInfoCardProps {
    auth: User | null;
    healthData?: HealthData;
}
export interface WeightProgressChartProps {
    weightLoading: boolean;
    formattedWeightData: { date: string; weight: number }[];
}

export interface HealthSummaryCardProps {
    healthData?: HealthData;
    healthLoading: boolean;
}

export interface ProgressBarProps {
    step: number;
    totalSteps: number;
}

export type RatingStarsProps = {
    rating: number;
};

export type ReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    existingReview: Review | null;
    doctorName: string;
    isLoading: boolean;
    onSubmit: (rating: number, reviewText: string) => void;
};

export type ReviewsListProps = {
    reviews: Review[]
    doctorName: string

}
export interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
export interface PasswordFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface Slot {
    _id: string;
    doctorId: string;
    startTime: string;
    endTime: string;
    date: string;
    consultationType: string;
    status: string;
}

export interface CalendarProps {
    slots: {
        success: boolean;
        message: string;
        slots: Slot[];
    };
    onSlotClick: (slot: Slot) => void;
}

export type SubscriptionCardProps = {
    title: string;
    description: string;
    price: string;
    features: string[];
    highlight?: boolean;
    onClick?: () => void
};
export interface SubscriptionDetailsProps {
    subscriptionDetails:
    | {
        _id: string
        userId: string
        subscriptionId: string
        startDate: string
        endDate: string
        status: string
        planName: string
        type: string
        price: number
        features: string[]
    }
    | null
    | undefined
    isLoading?: boolean
};

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    isLoading?: boolean
}


export interface IPaginationProps {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
}
export interface TransactionDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    transaction: Transaction
};

export interface TransactionTypeBadgeProps {
    type: "credit" | "debit" | "failed"
};

export type PaymentType = "slot_booking" | "cancel_appointment" | "subscription" | "refund";
export interface TransactionQueryParams {
    page?: number
    limit?: number
    search?: string
    type?: string
    status?: string
    paymentType?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}

export interface TransactionFiltersProps {
    searchQuery: string
    filterStatus: string | null
    sortConfig: {
        key: string | null
        direction: "asc" | "desc"
    }
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFilterChange: (status: string | null) => void
    onSortChange: (key: string) => void
    onClearFilters: () => void
    setQueryParams: React.Dispatch<React.SetStateAction<WalletTransactionQuery>>
}

export interface Transaction {
    _id: string
    description: string
    createdAt: string
    amount: number
    type: string
    status: string
    currency: string
}

export interface TransactionItemProps {
    transaction: Transaction
    currency: string
}

export interface TransactionListProps {
    transactions: Transaction[]
    searchQuery: string
    filterStatus: string | null
    currency: string
    clearFilters: () => void
};
export type PageLayoutProps = {
    children: ReactNode
    title: string
    subtitle?: string
    step: number
    totalSteps: number
    backAction?: () => void
    nextAction?: () => void
    nextDisabled?: boolean
    nextLabel?: string
    hideNext?: boolean
};

export interface HealthData {
    userHealthDetails: HealthDetails;
}

export interface HealthDetailsTabProps {
    healthData?: HealthData;
    healthLoading: boolean;
}

export interface HealthDetailsTabProps {
    healthData?: HealthData;
    healthLoading: boolean;
};
export interface WalletHeaderProps {
    balance: number
    currency: string
}
export interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctorName: string;
    amount: number;
}
export type ConfirmDialogProps = {
    message: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    isCancelLoading: boolean
    onConfirm: () => void;
    onCancel?: () => void;
    trigger: React.ReactNode;
    color: string
};


export interface ISlot {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
}

export interface ICalendarProps {
    selectedMonth: string;
    onMonthChange: (month: string) => void;
    slots?: ISlot[];
}
export type RecurrencePattern = {
    type: "daily" | "weekly" | "monthly";
    endDate: Date;
};
export type DatePickerInputProps = {
    date: string;
    setDate: (date: string) => void;
};
export type DateSelectorProps = {
    dates: { date: Date; slots: number }[];
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
};
export type DoctorDetailsResponse = {
    success: boolean;
    message: string;
    doctorDetails: {
        _id: string;
        name: string;
        email: string;
        isActive: boolean;
        role: string;
        status: string;
        profilePicture: string;
        details: {
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
            __v: number;
            education: string;
        };
    };
};
export interface DropdownProps<T> {
    title: string;
    options: { label: string; value: T }[];
    onChange: (value: T) => void;
    className?: string;
}

export type MonthSelectProps = {
    selectedDate: Date;
    onChange: (value: string) => void;
};
export interface RecurringSlotProps {
    enableRecurring: boolean;
    setEnableRecurring: React.Dispatch<React.SetStateAction<boolean>>;
    recurrenceType: "daily" | "weekly" | "monthly";
    setRecurrenceType: React.Dispatch<React.SetStateAction<"daily" | "weekly" | "monthly">>;
    recurrenceEndDate: Date | null;
    setRecurrenceEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    selectedDate: Date | null;
}

export type Review = {
    _id: string;
    userId: string;
    doctorId: string;
    rating: number;
    reviewText: string;
    createdAt: string;
    userDetails: {
        _id: string;
        name: string;
        profilePicture: string;
    };
};

export type CalendarDate = {
    date: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
};

export type SlotCalendarProps = {
    onDateSelect: (date: CalendarDate) => void;
};


export type SlotItemProps = {
    slot: Slot;
    onCancel?: (slotId: string) => void;
    isCancelLoading?: boolean;
};

export type NotificationDateType = {
    data: {
        name: string,
        profilePicture: string
    }
}
