import { IGetDoctorProfileResponse } from "@/types/api/doctor-api-types";
import { Phone, Mail, MessageSquare } from "lucide-react";


export default function DoctorProfile({ doctorDetails: doc }: { doctorDetails: IGetDoctorProfileResponse }) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-black p-4 rounded-t-xl flex justify-center">
        <img
          src={doc?.doctorDetails?.profilePicture}
          alt={doc?.doctorDetails?.name}
          className="w-50 h-50 object-cover rounded"
        />
      </div>

      <div className="flex-grow bg-black text-white p-4">
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-bold">{doc?.doctorDetails?.name}</h1>
            <p className="text-gray-300">{doc?.doctorDetails?.details?.primarySpecialty}</p>
          </div>

          <div className="bg-gray-800 inline-block px-2 py-1 rounded text-xs">About</div>

          <p className="text-xs text-gray-300">{doc?.doctorDetails?.details?.bio}</p>

          <div className="space-y-1 pt-2">
            <p className="text-xs">
              <span className="font-bold">Education:</span> {doc?.doctorDetails?.details?.education}
            </p>
          </div>

          <div className="space-y-1 pt-2">
            <p className="text-xs font-bold">Additional Details:</p>
            <ul className="text-xs list-disc pl-5 space-y-1">
              <li>Clinic Locations : {doc?.doctorDetails?.details?.clinicLocations}</li>
              <li>ConsulationFees : {doc?.doctorDetails?.details?.consultationFees}</li>
              <li>Experience : {doc?.doctorDetails?.details?.experience}</li>
              <li>Medical License No : {doc?.doctorDetails?.details?.medicalLicenseNumber}</li>
              <li>Office Address : {doc?.doctorDetails?.details?.officeAddress}</li>
            </ul>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-xs">{doc?.doctorDetails?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-xs">{doc?.doctorDetails?.details?.contactPhoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-xs">Message {doc?.doctorDetails?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
