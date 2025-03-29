import toast from "react-hot-toast";
import { useCancelSlotMutation } from "../../redux/api/doctorApi";
import { ErrorResponse } from "./doctorLoginHook";

export const useSlotCancelHook = () => {
    const [cancelSlot, { isLoading }] = useCancelSlotMutation();

    const handleCancel = async (slotId: string) => {
        try {
            await cancelSlot({ slotId }).unwrap();

            toast.success("Slot cancelled successfully");
        } catch (error) {
            const err = error as ErrorResponse
            if (err?.data?.message) {
                toast.error(err.data.message)
                return
            }
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return { handleCancel, isLoading };
};