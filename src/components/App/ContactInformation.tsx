import React from "react";
import { Phone, Mail } from "lucide-react";
import { DoctorDetails } from "@/types/DoctorDetail";

type ContactInformationProps = {
  doctorDetails: DoctorDetails;
};

const ContactInformation: React.FC<ContactInformationProps> = ({ doctorDetails }) => {
  return (
    <div className="hidden md:block w-64">
      <div className="bg-gray-800/30 rounded-lg p-6">
        <h2 className="text-white text-lg font-medium mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Phone className="text-purple-400 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-gray-200">{doctorDetails?.details?.contactPhoneNumber || "Not available"}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="text-purple-400 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-gray-200 break-all">{doctorDetails?.details?.professionalEmail || "Not available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
