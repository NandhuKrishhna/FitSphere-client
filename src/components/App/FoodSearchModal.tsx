import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import useSearchFood from "@/hooks/App/useSerachFood";
import useAddFood from "@/hooks/App/useAddFood";
import { IFoodItem } from "@/types/food";

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
}

export const FoodSearchModal = ({ isOpen, onClose, mealType }: FoodSearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { searchQuery, setSearchQuery, searchResults, isLoading, onSearchFood } = useSearchFood();
  const [selectedFood, setSelectedFood] = useState<IFoodItem | null>(null);
  const { handleSaveFood, isLoading: addFoodLoading } = useAddFood(mealType, selectedFood, onClose);

  const resultsArray = searchResults || [];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSelectedFood(null);
    }
  }, [isOpen, setSearchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">Add Food to {mealType}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search foods (e.g., 'chicken', 'oats', 'rice')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearchFood()}
              className="w-full bg-[#121212] border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none"
            />
            <Search className="absolute left-3 w-5 h-5 text-gray-500" />
            <button
              onClick={onSearchFood}
              className="absolute right-2 bg-purple-500 rounded-full p-1 text-white hover:bg-purple-600 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Results (Scrollable) */}
        <div className="max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : resultsArray.length > 0 ? (
            resultsArray.map((food, index) => (
              <div
                key={index}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedFood && selectedFood.name === food.name ? "bg-[#ffffff1a]" : "hover:bg-[#ffffff0d]"
                }`}
                onClick={() => setSelectedFood(food)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">{food.name.slice(0, 30) + "..."}</div>
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

        {/* Selected Food Details */}
        {selectedFood && (
          <div className="p-4 bg-[#13131f] border-t border-gray-800">
            <h4 className="font-bold text-white mb-2">{selectedFood.name}</h4>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{selectedFood.calories || "N/A"}</div>
                <div className="text-xs text-gray-400">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">{selectedFood.protein || 0}g</div>
                <div className="text-xs text-gray-400">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-500">{selectedFood.carbs || 0}g</div>
                <div className="text-xs text-gray-400">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">{selectedFood.fats || 0}g</div>
                <div className="text-xs text-gray-400">Fat</div>
              </div>
            </div>
            <button
              onClick={handleSaveFood}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              {addFoodLoading ? <span className="loading loading-spinner loading-sm"></span> : `Add to ${mealType}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
