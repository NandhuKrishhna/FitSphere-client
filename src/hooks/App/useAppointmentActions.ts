import { useCancelAppointmentMutation } from "@/redux/api/appApi";
import { Appointment } from "@/types/appointmentList";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useAppointmentActions = () => {
  const [cancelAppointment] = useCancelAppointmentMutation();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await cancelAppointment({ appointmentId }).unwrap();
      console.log(response);
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment");
    }
  };

  const openDetailsDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  return {
    selectedAppointment,
    isDialogOpen,
    setIsDialogOpen,
    handleCancelAppointment,
    openDetailsDialog,
  };
};
