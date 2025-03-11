import React from "react";
import { Phone, Mail } from "lucide-react";
import { DoctorDetails } from "@/types/DoctorDetail";

type MobileContactInfoProps = {
  doctorDetails: DoctorDetails;
};

const MobileContactInfo: React.FC<MobileContactInfoProps> = ({ doctorDetails }) => {
  return (
    <div className="md:hidden mt-4 space-y-2">
      <div className="flex items-center justify-center space-x-2 text-gray-300">
        <Phone size={16} className="text-purple-400" />
        <span>{doctorDetails?.details?.contactPhoneNumber || "Not available"}</span>
      </div>
      <div className="flex items-center justify-center space-x-2 text-gray-300">
        <Mail size={16} className="text-purple-400" />
        <span className="truncate">{doctorDetails?.details?.professionalEmail || "Not available"}</span>
      </div>
    </div>
  );
};

export default MobileContactInfo;
