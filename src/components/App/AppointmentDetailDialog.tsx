import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CreditCard, Loader, Mail, User, Video, Wallet } from "lucide-react"
import { Roles } from "@/utils/Enums"
import useHandleJoinMeeting from "@/hooks/App/useJoinMeeting"

interface Appointment {
  _id: string
  consultationType: string
  date: string
  paymentStatus: string
  amount: number
  status: string
  meetingId: string
  paymentMethod: string
  paymentThrough: string
  slot: {
    startTime: string
    endTime: string
  }
  otherUser: {
    name: string
    email: string
    profilePicture: string
  }
}

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment
  role: string
}

export function AppointmentDetailsDialog({ isOpen, onClose, appointment, role }: AppointmentDetailsModalProps) {
  const {handleJoinMeet , isJoiningMeeting} =useHandleJoinMeeting()
  if (!appointment) return null
  // console.log(appointment)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date)
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }



  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Appointment Details</DialogTitle>
          <DialogDescription className="text-gray-400">Complete information about this appointment</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-white">Appointment Summary</h3>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(appointment.date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                    appointment.status === "scheduled"
                      ? "bg-blue-900/20 text-blue-400"
                      : appointment.status === "completed"
                        ? "bg-green-900/20 text-green-400"
                        : appointment.status === "failed"
                          ? "bg-red-900/20 text-red-400"
                          : "bg-orange-900/20 text-orange-400"
                  }`}
                >
                  {appointment.status}
                </span>
                {appointment.meetingId && appointment.status === "scheduled" && (
                 <Button
                 onClick={() => handleJoinMeet(appointment?.meetingId)}
                 className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
               >
                 {isJoiningMeeting ? <Loader className="animate-spin" />  : "Join Meet"}
               </Button>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">Appointment ID</span>
                </div>
                <p className="font-mono text-sm">{appointment._id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Video className="h-4 w-4 mr-2" />
                  <span className="text-sm">Consultation Type</span>
                </div>
                <p className="capitalize">{appointment.consultationType}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Time Slot</span>
                </div>
                <p>
                  {formatTime(appointment.slot.startTime)} - {formatTime(appointment.slot.endTime)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="text-sm">Payment Method</span>
                </div>
                <p className="capitalize">{appointment.paymentMethod || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="text-sm">Payment Status</span>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    appointment.paymentStatus === "completed"
                      ? "bg-green-900/20 text-green-400"
                      : appointment.paymentStatus === "pending"
                        ? "bg-yellow-900/20 text-yellow-400"
                        : "bg-red-900/20 text-red-400"
                  }`}
                >
                  {appointment.paymentStatus}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">Amount</span>
                </div>
                <p className="text-lg font-bold text-indigo-400">₹{appointment.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">
              {role === Roles.USER ? "Doctors Details" : "Patient Details"}
            </h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-indigo-600">
                <AvatarImage src={appointment.otherUser.profilePicture} alt={appointment.otherUser.name} />
                <AvatarFallback className="bg-indigo-900 text-white">
                  {appointment.otherUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-indigo-400" />
                  <p className="font-medium">{appointment.otherUser.name}</p>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-indigo-400" />
                  <p className="text-sm text-gray-300">{appointment.otherUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

