import { useCancelAppointmentMutation } from "@/redux/api/appApi";
import { IGetAppointment } from "@/types/api/appointment-api-types";
import { AppointmentQueryParams } from "@/types/appointmentList";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useAppointmentActions = () => {
  const [cancelAppointment, { isLoading: isAppointmentCancelLoading }] = useCancelAppointmentMutation();
  const [selectedAppointment, setSelectedAppointment] = useState<IGetAppointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancelAppointment = async (appointmentId: string, query: AppointmentQueryParams) => {
    try {
      await cancelAppointment({ appointmentId, queryParams: query }).unwrap();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment");
    }
  };

  const openDetailsDialog = (appointment: IGetAppointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  return {
    selectedAppointment,
    isDialogOpen,
    setIsDialogOpen,
    handleCancelAppointment,
    openDetailsDialog,
    isAppointmentCancelLoading
  };
};
