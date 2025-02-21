import { zodResolver } from "@hookform/resolvers/zod";
import { useAddSlotsMutation } from "../../redux/api/doctorApi";
import { slotSchema } from "../../types/Validations/DoctorValidation";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "./doctorLoginHook";
import toast from "react-hot-toast";

type SlotDatas = {
  date : Date;
  startTime: Date;
  endTime: Date;
  consultationType: string;
};
const useSlotAddingHook = () => {
  const [addSlots, { isLoading }] = useAddSlotsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SlotDatas>({ resolver: zodResolver(slotSchema) });
  const onSubmit = async (data: SlotDatas) => {
    console.log(data)
    try {
      const res = await addSlots(data).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (err) {
        console.log(err)
      const error = err as ErrorResponse;
      if (error.data?.errors) {
        error.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else if (error.status === 409 && error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return {
    register ,
    handleSubmit : handleSubmit(onSubmit),
    errors,
    isLoading
  }
};

export default useSlotAddingHook;
