import { useState } from "react"
import { Coffee, Plus, ChevronDown, ChevronUp } from "lucide-react"
import type { MealData, MealListProps } from "@/types/food"
import { FoodItemsList } from "./FoodItemsList"


export default function MealList({
  mealTypes,
  meals,
  selectedDay,
  handleOpenAddFoodModal,
  handleOpenEditFoodModal,
  handleDeleteFood,
  loadingItems,
}: MealListProps) {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)

  const toggleExpandMeal = (mealId: string) => {
    if (expandedMeal === mealId) {
      setExpandedMeal(null)
    } else {
      setExpandedMeal(mealId)
    }
  }

  return (
    <div className="space-y-4">
      {mealTypes.map((meal) => (
        <div key={meal.id} className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between p-5 cursor-pointer"
            onClick={() => toggleExpandMeal(meal.id)}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-lg">{meal.type}</div>
                <div className="text-sm text-gray-400">
                  {meal.itemCount === 0 ? (
                    <span>No items added • {meal.recommended}</span>
                  ) : (
                    <span>
                      {meal.itemCount} items • {meal.totalCalories} kcal
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenAddFoodModal(meal.id)
                }}
              >
                <Plus className="w-5 h-5 text-black" />
              </button>
              {expandedMeal === meal.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          {expandedMeal === meal.id && (
            <div className="border-t border-gray-800 px-5 py-2">
              <FoodItemsList
                mealType={meal.id}
                items={meals?.[meal.id as keyof MealData] || []}
                handleDeleteFood={handleDeleteFood}
                handleEditFood={(foodItem) => handleOpenEditFoodModal(meal.id, foodItem,)}
                selectedDay={selectedDay}
                loadingItems={loadingItems}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


