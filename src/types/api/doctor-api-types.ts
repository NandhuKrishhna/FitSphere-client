import { DoctorDetails } from "../DoctorTypes";
import { Slot } from "../Slot";

export interface IAddReviewProps {
  doctorId: string,
  rating: number,
  reviewText: string;
  profilePicture: string;
  name: string;
  userId: string
}

export interface IAddReviewResponse {
  success: boolean;
  message: string;
  reviewId: string
}

export interface IAddedReview {
  doctorId: string;
  rating: number;
  reviewText: string;
  userId: string
  _id: string
  createdAt: string
}
export interface ITotalRating {
  averageRating: number;
  doctorId: string;
  totalReviews: number;
  _id: string
}

export interface IGetAllReviewAndRatingResponse {
  success: boolean;
  message: string;
  response: {
    averageRating: number;
    reviews: Reviews[];
    totalReviews: number;
  };
}


interface UserDetails {
  name: string;
  profilePicture: string;
  _id: string
}

interface Reviews extends IAddedReview {
  userDetails: UserDetails
};

export interface IGetReviewProps {
  doctorId: string | null
};

export interface IDeleteReviewProps {
  reviewId: string;
  doctorId: string;
};
export interface IDeleteReviewResponse {
  success: boolean;
  message: string;
};
export interface IEditReviewProps {
  reviewId: string;
  doctorId: string;
  rating: number;
  reviewText: string;
};
export interface IEditReviewResponse {
  success: boolean;
  message: string;
};

export interface IGetAllSlotDetailsResponse {
  success: boolean;
  response: Slot[]
};

export interface ICaneceSlotResponse {
  success: boolean;
  message: string;

};

export interface IGetDoctorProfileResponse {
  success: boolean;
  message: string;
  doctorDetails: IDoctor
}

export interface IDoctor {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  status: string;
  profilePicture: string;
  details: DoctorDetails
};
export interface IUpdateDoctorDetailsResponse {
  success: boolean;
  message: string;
  response: DoctorDetails
}