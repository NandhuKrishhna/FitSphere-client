
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";
import { useDeleteSubcriptionMutation } from "@/redux/api/adminApi";


const useDeleteSubcription = () => {
    const [deleteSubcription, { isLoading: isDeleteSubscriptionLoading }] = useDeleteSubcriptionMutation();
    const handleDeleteSubscription = async (id: string) => {
        console.log("ID from useDeleteSubcription", id)
        try {
            const response = await deleteSubcription(id).unwrap();
            toast.success(response.message);
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }
    }
    return {
        handleDeleteSubscription,
        isDeleteSubscriptionLoading
    }
};
export default useDeleteSubcription