import { useUpdateUserHealthDetailsMutation } from "@/redux/api/caloriesApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";
export type userHealthDetails = {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goal: string;
    targetWeight: number;
    weeksToGoal: number;
    targetDailyCalories: number;
}
const useUpdateUserHealthDetails = () => {
   
    const [updateUserHealthDetails, {isLoading:isUpdatingUser }] = useUpdateUserHealthDetailsMutation();
    const handleUpdateUserHealthDetails = async (data :Partial<userHealthDetails>) => {
        try {
            const response = await updateUserHealthDetails(data).unwrap();
            toast.success(response.message);
        } catch (error) {
            const err = error as ErrorResponse;
            if(err.data.message) return toast.error(err.data.message);
            toast.error("An error occurred.Please try again.");
            
        }
    }
    return {handleUpdateUserHealthDetails,isUpdatingUser}
};

export default useUpdateUserHealthDetails