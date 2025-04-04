import { useEditSubcriptionMutation } from "@/redux/api/adminApi";
import { ISubscription } from "@/types/api/admin-api-types";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

const useEditSubscription = () => {

    const [editSubcription, { isLoading: isEditSubscriptionLoading }] = useEditSubcriptionMutation();
    const handleEditSubscription = async (data: ISubscription) => {
        console.log(data);
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