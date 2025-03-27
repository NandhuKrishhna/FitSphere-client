import { useEditSubcriptionMutation } from "@/redux/api/adminApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";
export type SubscriptionParams = {
    type: string,
    planName: string,
    price: number,
    features: string[]
    id: string
}
const useEditSubscription = () => {

    const [editSubcription, { isLoading: isEditSubscriptionLoading }] = useEditSubcriptionMutation();
    const handleEditSubscription = async (data: SubscriptionParams) => {
        try {
            const response = await editSubcription(data).unwrap();
            toast.success(response.message);
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }

    }
    return {
        handleEditSubscription,
        isEditSubscriptionLoading
    }
};
export default useEditSubscription;