import { useState } from "react";
import { useDeleteFoodLogMutation } from "@/redux/api/caloriesApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";

const useDeleteFood = () => {
  const [deleteFoodLog] = useDeleteFoodLogMutation();
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>({});

  const handleDeleteFood = async (foodId?: string, date?: string) => {
    if (!foodId) return;
    
    setLoadingItems((prev) => ({ ...prev, [foodId]: true }));

    try {
      const response = await deleteFoodLog({ foodId, date }).unwrap();
      toast.success(response.message);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err?.data?.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [foodId]: false }));
    }
  };

  return {
    handleDeleteFood,
    loadingItems, 
  };
};

export default useDeleteFood;
