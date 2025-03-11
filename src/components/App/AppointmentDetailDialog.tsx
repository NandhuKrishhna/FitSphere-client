import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { Appointment } from "@/types/appointmentList";
import useHandleJoinMeeting from "@/hooks/App/useJoinMeeting";

interface AppointmentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onCancel: (appointmentId: string) => void;
  onRetryPayment?: (appointmentId: string) => void;
  formatDate: (dateString: string) => string;
  formatToIndianTime: (dateString: string) => string;
}
const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  isOpen,
  onClose,
  appointment,
  onCancel,
  // onRetryPayment,
  formatDate,
  formatToIndianTime,
}) => {
  const { isJoiningMeeting, handleJoinMeet } = useHandleJoinMeeting();
  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-indigo-200">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>

        {appointment.status === "scheduled" && (
          <div className="absolute top-12 right-4">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
              onClick={() => handleJoinMeet(appointment.meetingId!)}
              disabled={isJoiningMeeting}
            >
              <Video className="w-4 h-4" />
              Join Meeting
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <img
              src={appointment.doctor.profilePicture || "/placeholder.svg"}
              alt={appointment.doctor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h3 className="font-semibold text-xl">{appointment.doctor.name}</h3>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium w-24 text-center
                  ${
                    appointment.status === "scheduled"
                      ? "bg-yellow-100 text-yellow-800"
                      : appointment.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
              >
                {appointment.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formatDate(appointment.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">
                {formatToIndianTime(appointment.slot.startTime)} - {formatToIndianTime(appointment.slot.endTime)}
              </p>
            </div>
          </div>

          <div className="py-2 border-t">
            <p className="text-sm text-gray-500 mb-1">Consultation Type</p>
            <p className="font-medium flex items-center">
              <Video className="w-4 h-4 mr-2 text-blue-500" />
              {appointment.consultationType}
            </p>
          </div>

          <div className="py-2 border-t">
            <p className="text-sm text-gray-500 mb-1">Payment Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-24 text-center
                ${
                  appointment.paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : appointment.paymentStatus === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
              {appointment.paymentStatus}
            </span>
          </div>

          <div className="py-2 border-t">
            <p className="text-sm text-gray-500 mb-1">Payment Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="font-medium">₹{appointment.amount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Method</p>
                <p className="font-medium capitalize">{appointment.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Through</p>
                <p className="font-medium">{appointment.paymentThrough}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-medium text-xs overflow-hidden text-ellipsis">{appointment.orderId}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-between">
            {appointment.status === "scheduled" && appointment.paymentStatus !== "failed" && (
              <Button
                className="bg-red-300"
                variant="destructive"
                size="sm"
                onClick={() => {
                  onCancel(appointment._id);
                  onClose();
                }}
              >
                Cancel Appointment
              </Button>
            )}
            {appointment.paymentStatus === "failed" && (
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                size="sm"
                // onClick={() => {
                //   onRetryPayment(appointment._id);
                //   onClose();
                // }}
              >
                Pay Again
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
