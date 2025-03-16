import { useState } from "react"
import { useEditFoodMutation } from "@/redux/api/caloriesApi"
import type { IFoodItem } from "@/types/food"
import { toast } from "react-hot-toast"

const useEditFood = (mealType: string, foodItem: IFoodItem | null, onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const [editFood] = useEditFoodMutation()

  const handleEditFood = async (foodId: string) => {
    if (!foodItem) return

    setIsLoading(true)
    try {
      const date = new Date().toISOString().split("T")[0]

      await editFood({
        foodId,
        date,
        foodItem,
        mealType,
      }).unwrap()

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

