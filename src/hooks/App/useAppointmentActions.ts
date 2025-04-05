import { useCancelAppointmentMutation } from "@/redux/api/appApi";
import { IGetAppointment } from "@/types/api/appointment-api-types";
import { AppointmentQueryParams } from "@/types/appointmentList";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

export const useAppointmentActions = () => {
  const [cancelAppointment, { isLoading: isAppointmentCancelLoading }] = useCancelAppointmentMutation();
  const [selectedAppointment, setSelectedAppointment] = useState<IGetAppointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancelAppointment = async (appointmentId: string, query: AppointmentQueryParams) => {
    try {
      await cancelAppointment({ appointmentId, queryParams: query }).unwrap();
    } catch (error) {
      const err = error as ErrorResponse;
      if (err?.data?.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
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
