import toast from "react-hot-toast";
import { useCancelSlotMutation } from "../../redux/api/doctorApi";
import { ErrorResponse } from "./doctorLoginHook";
import { useDispatch } from "react-redux";
import { setCanelSlot } from "../../redux/slice/doctorSlice";

export const useSlotCancelHook = () => {
    const [cancelSlot, { isLoading }] = useCancelSlotMutation();
    const dispatach = useDispatch()

    const handleCancel = async (slotId: string) => {
        console.log(slotId)
        console.log(typeof slotId)
        dispatach(setCanelSlot(slotId))
        try {
            const response = await cancelSlot({ slotId }).unwrap();
            console.log(response);
            toast.success("Slot cancelled successfully");
        } catch (error) {
            const err  = error as ErrorResponse
            if(err?.data?.message){
                toast.error(err.data.message)
                return
            }
            toast.error("An unexpected error occurred. Please try again.");
        }finally{
            dispatach(setCanelSlot(''))
        }
    };

    return { handleCancel, isLoading };
};