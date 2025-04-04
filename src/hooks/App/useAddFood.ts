import { useAddFoodLogMutation } from "@/redux/api/caloriesApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";
import { IFoodItem } from "@/types/food";


const useAddFood = (
  selectedDay: string,
  mealType: string,
  selectedFood: IFoodItem | null,
  onClose: () => void,
  setSearchQuery: (value: string) => void
) => {
  const [addFoodLog, { isLoading }] = useAddFoodLogMutation();

  const handleSaveFood = async () => {
    if (!selectedFood) return;

    try {
      const response = await addFoodLog({
        date: selectedDay,
        mealType,
        foodItem: {
          name: selectedFood.name,
          calories: selectedFood.calories,
          protein: selectedFood.protein!,
          carbs: selectedFood.carbs!,
          fats: selectedFood.fats!,
          quantity: selectedFood.quantity,
        },
      }).unwrap();
      console.log(response)
      toast.success("Food added successfully!");
      setSearchQuery("")
      onClose();
    } catch (error) {
      const err = error as ErrorResponse;
      if (err?.data?.message) return toast.error(err.data.message);
      toast.error("Failed to fetch food data. Please try again.");
    }
  };

  return { handleSaveFood, isLoading };
};

export default useAddFood;
