import { useEffect, useMemo, useRef, useState } from "react"
import { X, Search } from "lucide-react"
import useSearchFood from "@/hooks/App/useSerachFood"
import useAddFood from "@/hooks/App/useAddFood"
import type { IFoodItem } from "@/types/food"

interface FoodSearchModalProps {
  isOpen: boolean
  onClose: () => void
  mealType: string
}

export const FoodSearchModal = ({ isOpen, onClose, mealType }: FoodSearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { searchQuery, setSearchQuery, quantity, setQuantity, searchResults, isLoading } = useSearchFood()
  const [selectedFood, setSelectedFood] = useState<IFoodItem | null>(null)
  const { handleSaveFood, isLoading: addFoodLoading } = useAddFood(
    mealType,
    selectedFood ? { ...selectedFood, quantity: `${quantity}g` } : null,
    onClose,
  )
  const quantityOptions = [50, 100, 150, 200, 250, 300]

  const resultsArray = useMemo(() => searchResults || [], [searchResults]);
  
  useEffect(() => {
    setSelectedFood(null)
  }, [searchQuery])
  

  useEffect(() => {

    if (selectedFood && resultsArray.length > 0) {
      const updatedFood = resultsArray.find(food => food.name === selectedFood.name);
      if (updatedFood) {
        setSelectedFood(updatedFood);
      }
    }
  }, [resultsArray, selectedFood]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])
  
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("")
      setSelectedFood(null)
      setQuantity(100)
    }
  }, [isOpen, setQuantity, setSearchQuery])
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">Add Food to {mealType}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-4">
          <div className="relative flex items-center">
            <div className="absolute left-3 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : resultsArray.length > 0 ? (
            resultsArray.map((food: IFoodItem, index: number) => (
              <div
                key={index}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedFood && selectedFood.name === food.name ? "bg-[#ffffff1a]" : "hover:bg-[#ffffff0d]"
                }`}
                onClick={() => {
                  setSelectedFood(food)
                  setQuantity(100) 
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">{food.name}</div>
                    <div className="text-xs text-gray-400">{food.quantity}</div>
                  </div>
                  <div className="text-orange-400 font-medium">{food.calories || "N/A"} kcal</div>
                </div>
              </div>
            ))
          ) : (
            searchQuery && <div className="p-4 text-center text-gray-400">No results found.</div>
          )}
        </div>
        {selectedFood && (
          <div className="p-4 bg-[#13131f] border-t border-gray-800">
            <h4 className="font-bold text-white mb-2">{selectedFood.name}</h4>
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-1 block">Quantity (grams)</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {quantityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setQuantity(option)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      quantity === option ? "bg-purple-500 text-white" : "bg-[#2a2a40] text-gray-300 hover:bg-[#3a3a50]"
                    }`}
                  >
                    {option}g
                  </button>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const newQuantity = Math.max(1, Number.parseInt(e.target.value) || 1)
                    setQuantity(newQuantity)
                  }}
                  className="bg-[#1e1e30] border border-gray-700 rounded-md text-white px-3 py-1 w-full focus:outline-none focus:border-purple-500"
                />
                <span className="ml-2 text-gray-400">grams</span>
              </div>

              <div className="mt-1 text-xs text-gray-400">Base serving: {selectedFood.quantity}</div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{selectedFood.calories || "N/A"}</div>
                <div className="text-xs text-gray-400">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">{selectedFood.protein}g</div>
                <div className="text-xs text-gray-400">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-500">{selectedFood.carbs}g</div>
                <div className="text-xs text-gray-400">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">{selectedFood.fat}g</div>
                <div className="text-xs text-gray-400">Fat</div>
              </div>
            </div>
            <button
              onClick={handleSaveFood}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              {addFoodLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                `Add ${quantity}g to ${mealType}`
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}