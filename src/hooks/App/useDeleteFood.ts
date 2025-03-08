import { useDeleteFoodLogMutation } from "@/redux/api/caloriesApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";

const useDeleteFood = () => {
  const [deleteFoodLog, { isLoading }] = useDeleteFoodLogMutation();

  const handleDeleteFood = async (foodId?: string, date?: string) => {
    try {
      const response = await deleteFoodLog({ foodId, date }).unwrap();
      toast.success(response.message);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err?.data?.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  return {
    handleDeleteFood,
    isLoading,
  };
};

export default useDeleteFood;
