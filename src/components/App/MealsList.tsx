"use client";

import { useState } from "react";
import { Coffee, Plus, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { IFoodItem } from "@/types/food";

interface MealType {
  id: string;
  type: string;
  recommended: string;
  itemCount: number;
  totalCalories: number;
}

interface MealData {
  breakfast: IFoodItem[];
  lunch: IFoodItem[];
  dinner: IFoodItem[];
  snacks: IFoodItem[];
}

interface MealListProps {
  mealTypes: MealType[];
  meals: MealData | undefined;
  selectedDay: string;
  handleOpenAddFoodModal: (mealId: string) => void;
  handleDeleteFood: (foodId: string | undefined, date: string) => void;
  deleteFoodLoading: boolean;
}

export default function MealList({
  mealTypes,
  meals,
  selectedDay,
  handleOpenAddFoodModal,
  handleDeleteFood,
  deleteFoodLoading,
}: MealListProps) {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const toggleExpandMeal = (mealId: string) => {
    if (expandedMeal === mealId) {
      setExpandedMeal(null);
    } else {
      setExpandedMeal(mealId);
    }
  };

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
                  e.stopPropagation();
                  handleOpenAddFoodModal(meal.id);
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

          {/* Expanded meal details */}
          {expandedMeal === meal.id && (
            <div className="border-t border-gray-800 px-5 py-2">
              <FoodItemsList
                mealType={meal.id}
                items={meals?.[meal.id as keyof MealData] || []}
                handleDeleteFood={handleDeleteFood}
                selectedDay={selectedDay}
                deleteFoodLoading={deleteFoodLoading}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface FoodItemsListProps {
  mealType: string;
  items: IFoodItem[];
  handleDeleteFood: (foodId: string | undefined, date: string) => void;
  selectedDay: string;
  deleteFoodLoading: boolean;
}

function FoodItemsList({ mealType, items, handleDeleteFood, selectedDay, deleteFoodLoading }: FoodItemsListProps) {
  if (!items || items.length === 0) {
    return <div className="py-3 text-center text-gray-400 text-sm">No items added to {mealType} yet</div>;
  }

  return (
    <div className="space-y-2 py-2">
      <div className="grid grid-cols-12 text-xs text-gray-400 px-2 mb-1">
        <div className="col-span-5">Food</div>
        <div className="col-span-2 text-center">Calories</div>
        <div className="col-span-1 text-center">P</div>
        <div className="col-span-1 text-center">C</div>
        <div className="col-span-1 text-center">F</div>
        <div className="col-span-2"></div>
      </div>
      {items.map((item) => (
        <div key={item._id} className="grid grid-cols-12 bg-[#1e1e30] rounded-lg p-3 items-center">
          <div className="col-span-5 font-medium text-sm">{item.name}</div>
          <div className="col-span-2 text-center text-sm">{item.calories} kcal</div>
          <div className="col-span-1 text-center text-xs text-green-400">{item.protein?.toFixed(1) || 0}g</div>
          <div className="col-span-1 text-center text-xs text-purple-400">{item.carbs?.toFixed(1) || 0}g</div>
          <div className="col-span-1 text-center text-xs text-yellow-400">{item.fats?.toFixed(1) || 0}g</div>
          <div className="col-span-2 flex justify-end">
            <button
              className="p-1 hover:bg-red-900 rounded-full transition-colors"
              onClick={() => handleDeleteFood(item?._id, selectedDay)}
            >
              {deleteFoodLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Trash2 className="w-4 h-4 text-red-500" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
