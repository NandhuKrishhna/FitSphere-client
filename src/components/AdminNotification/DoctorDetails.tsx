import { User, Award, CreditCard, Mail, Phone, MapPin } from "lucide-react";
import { DoctorRegistrationMetadata } from "../../types/auth.types";


interface DoctorDetailsProps {
  metadata?: DoctorRegistrationMetadata;
}

export const DoctorDetails = ({ metadata }: DoctorDetailsProps) => {
  const details = metadata?.newDoctorDetails;

  return (
    <div className="p-6 space-y-4 text-white">
      <div className="flex items-start space-x-3 flex-wrap">
        <User className="text-blue-400" />
        <p className="text-gray-300 flex-1">{details?.bio || "No bio available."}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Award className="text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Experience</p>
            <p className="font-semibold">{details?.experience || 0} years</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <CreditCard className="text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Consultation</p>
            <p className="font-semibold">${details?.consultationFees || 0}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="text-yellow-400" />
          <p className="text-gray-300">{details?.professionalEmail || "No email"}</p>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="text-blue-400" />
          <p className="text-gray-300">{details?.contactPhoneNumber || "No phone number"}</p>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="text-red-400" />
          <p className="text-gray-300">{details?.clinicLocations || "No location specified"}</p>
        </div>
      </div>
    </div>
  );
};