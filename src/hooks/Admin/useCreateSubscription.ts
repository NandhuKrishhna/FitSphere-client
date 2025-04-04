import { useAddSubcriptionMutation } from "@/redux/api/adminApi";
import { ISubscription } from "@/types/api/admin-api-types";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

const useCreateSubscription = () => {
    const [addSubcription, { isLoading: isAddSubscriptionLoading }] = useAddSubcriptionMutation();
    const handleAddSubscription = async (data: ISubscription) => {
        try {
            const response = await addSubcription(data).unwrap();
            toast.success(response.message);
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }

    }
    return {
        handleAddSubscription,
        isAddSubscriptionLoading
    }
};
export default useCreateSubscription;