import React from "react";
import { BadgeCheck, Calendar } from "lucide-react";
import RatingStars from "./RatingStars";
import { DoctorDetails } from "@/types/DoctorDetail";
import MobileContactInfo from "./MobileContactInfo";

type DoctorProfileProps = {
  doctorDetails: DoctorDetails;
  averageRating: number;
  totalReviews: number;
};

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctorDetails, averageRating, totalReviews }) => {
  return (
    <>
      <div className="relative mx-auto md:mx-0">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
          <img
            src={doctorDetails.profilePicture || "/placeholder.svg"}
            alt="Doctor profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-sm p-1 rounded-full">
          <BadgeCheck className="text-green-400 w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
        <h1 className="text-white text-2xl md:text-3xl font-semibold">{doctorDetails.name}</h1>
        <p className="text-purple-400 text-lg md:text-xl mt-1">{doctorDetails?.details?.primarySpecialty}</p>

        <div className="flex items-center justify-center md:justify-start space-x-2 mt-2 text-gray-400">
          <Calendar size={16} className="text-purple-400" />
          <span>{doctorDetails?.details?.experience}+ Years Experience</span>
        </div>

        <div className="flex items-center justify-center md:justify-start mt-2 space-x-2">
          <RatingStars rating={averageRating} />
          <span className="text-gray-300 text-sm">
            {averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
          </span>
        </div>

        <MobileContactInfo doctorDetails={doctorDetails} />
      </div>
    </>
  );
};

export default DoctorProfile;
