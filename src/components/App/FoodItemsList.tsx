import { FoodItemsListProps } from "@/types/food"
import { Edit2, Loader, Trash2 } from "lucide-react"


export function FoodItemsList({
    mealType,
    items,
    handleDeleteFood,
    handleEditFood,
    selectedDay,
    loadingItems,
}: FoodItemsListProps) {
    if (!items || items.length === 0) {
        return <div className="py-3 text-center text-gray-400 text-sm">No items added to {mealType} yet</div>
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
                    <div className="col-span-2 flex justify-end space-x-2">
                        <button
                            className="p-1 hover:bg-blue-900 rounded-full transition-colors"
                            onClick={() => {

                                handleEditFood(item, selectedDay)
                            }}
                        >
                            <Edit2 className="w-4 h-4 text-blue-500" />
                        </button>

                        <button
                            className="p-1 hover:bg-red-900 rounded-full transition-colors"
                            onClick={() => handleDeleteFood(item._id!, selectedDay!, mealType)}
                        >
                            {loadingItems[item._id!] ? (
                                <Loader className="animate-spin mx-auto" size={15} />
                            ) : (
                                <Trash2 className="w-4 h-4 text-red-500" />
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
