import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useAddSlotsMutation, useGetAllSlotsQuery } from "../../redux/api/doctorApi";
import SlotList from "../../components/Doctor/SlotList";
import SlotForm from "../../components/Doctor/SlotForm";
import { Slot } from "../../types/Slot";
import { ErrorResponse } from "../../types/userTypes";
import Calendar from "../../components/Doctor/SlotCalender";
import { useSlotCancelHook } from "../../hooks/DoctorHooks/SlotCancelHook";
import DoctorHeader from "../../components/Doctor/DoctorHeader";


type CalendarDate = {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
};

const DoctorDashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [addSlots, { isLoading }] = useAddSlotsMutation();
  const { data, isLoading: isSlotsLoading } = useGetAllSlotsQuery({});
  const [slots, setSlots] = useState<Slot[]>([]);
  const {handleCancel , isLoading: isCancelLoading} = useSlotCancelHook()
  useEffect(() => {
    if (data?.response) {
      setSlots(data.response);
    }
  }, [data]);

  const handleDateSelect = (date: CalendarDate) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (data: {
    startTime: string;
    endTime: string;
    consultationType: string;
  }) => {
    if (!selectedDate) {
      toast.error("Please select a date on the calendar.");
      return;
    }

    const formattedDate = `${selectedDate.year}-${String(selectedDate.month + 1)
      .padStart(2, "0")}-${String(selectedDate.date).padStart(2, "0")}`;

    try {
      const startTimeISO = new Date(`${formattedDate}T${data.startTime}:00Z`).toISOString();
      const endTimeISO = new Date(`${formattedDate}T${data.endTime}:00Z`).toISOString();

      const res = await addSlots({
        startTime: startTimeISO,
        endTime: endTimeISO,
        date: formattedDate,
        consultationType: data.consultationType,
      }).unwrap();

      toast.success(res.message);
    } catch (error) {
      console.log(error)
      const err = error as ErrorResponse;
      if (err.data?.message) {
        toast.error(err.data.message);
        return;
      }
      if(err.data?.errors) {
        err.data.errors.forEach((err) => {
          toast.error(err.message);
        });
        return
      }
      toast.error("An unexpected error occurred. Please try again.");
      
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen">
      <DoctorHeader/>

      <div className="flex-1 p-4 mt-11 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SlotList slots={slots} isLoading={isSlotsLoading} onCancel={handleCancel} isCanelLoading={isCancelLoading} />
        
        <div className="space-y-6">
          <Calendar onDateSelect={handleDateSelect} />
          <SlotForm
            selectedDate={selectedDate}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;