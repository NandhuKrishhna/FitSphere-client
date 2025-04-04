import { useState } from "react"
import { useEditFoodMutation } from "@/redux/api/caloriesApi"
import { toast } from "react-hot-toast"
import { FoodItem } from "@/types/api/calories-api-types"

const useEditFood = (
  mealType: string,
  foodItem: FoodItem | null,
  onClose: () => void,
  selectedDay: string
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [editFood] = useEditFoodMutation()

  const handleEditFood = async (foodId: string) => {

    if (!foodItem) return

    setIsLoading(true)
    try {


      const response = await editFood({
        foodId,
        date: selectedDay,
        foodItem,
        mealType,
      }).unwrap()
      console.log("Response : ", response)
      toast.success("Food updated successfully")
      onClose()
    } catch (error) {
      console.error("Failed to update food:", error)
      toast.error("Failed to update food")
    } finally {
      setIsLoading(false)
    }
  }

  return { handleEditFood, isLoading }
}

export default useEditFood

