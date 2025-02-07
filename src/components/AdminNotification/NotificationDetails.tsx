// components/NotificationDetails/NotificationDetails.tsx
import { Paperclip } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { DoctorDetails } from "./DoctorDetails";
import { Notification } from "../../types/auth.types";


interface NotificationDetailsProps {
  notification: Notification | null;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
  isApproving: boolean;
  isRejecting: boolean;
  onPreviewImage: () => void;
}

export const NotificationDetails = ({
  notification,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
  onPreviewImage,
}: NotificationDetailsProps) => {
  if (!notification) {
    return (
      <div className="text-center text-white text-lg p-6">
        Select a notification to view details
      </div>
    );
  }

  return (
    <div className="w-1/2 h-[750px] bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl border border-[#2A2A2A]">
      <ProfileHeader
        doctorName={notification.metadata?.doctorName}
        specialty={notification.metadata?.newDoctorDetails?.primarySpecialty}
      />
      <DoctorDetails metadata={notification.metadata} />

      {/* Attachment Section */}
      <div
        className="h-[50px] text-white cursor-pointer ml-6 inline-flex items-center justify-center space-x-2 p-3 rounded-md bg-[#2a2a2a]"
        onClick={onPreviewImage}
      >
        <p>Attachment</p>
        <Paperclip />
      </div>
      <p className="ml-6">Click here to preview</p>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 mr-9 text-black font-semibold">
        <button
          className="bg-gradient-to-br from-green-400 to-green-600 px-4 py-2 rounded-xl"
          onClick={() => onApprove(notification.userId)}
          disabled={isApproving}
        >
          {isApproving ? "Approving..." : "Accept"}
        </button>
        <button
          className="bg-red-400 px-4 py-2 rounded-xl"
          onClick={() => onReject(notification.userId)}
          disabled={isRejecting}
        >
          {isRejecting ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
};
