import { useUpdatePasswordMutation } from "@/redux/api/appApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";

const useUpdatePassword = () => {

    const [updatePassword , {isLoading:isUpdatingPassword}] = useUpdatePasswordMutation()
    const handleUpdatePassword = async (data: {currentPassword:string, newPassword:string}) => {
        try {
            const response = await updatePassword(data).unwrap();
            toast.success(response.message);
        } catch (error) {
            const err = error as ErrorResponse;
            if(err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }
    }
    return {handleUpdatePassword, isUpdatingPassword};
};
export default useUpdatePassword;