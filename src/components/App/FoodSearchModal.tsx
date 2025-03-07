import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { IFoodItem } from "@/pages/Users/HomePage";

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
  onSave: (foodItem: IFoodItem, mealType: string) => void;
}

interface FoodSearchResult {
  name: string;
  quantity: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

export const FoodSearchModal = ({ isOpen, onClose, mealType, onSave }: FoodSearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const mockFoodDatabase: Record<string, FoodSearchResult[]> = {
    chicken: [
      {
        name: "Grilled Chicken Breast",
        quantity: "100g",
        protein: 31,
        fat: 3.6,
        carbs: 0,
        calories: 165,
      },
      {
        name: "Chicken Thigh",
        quantity: "100g",
        protein: 26,
        fat: 10.9,
        carbs: 0,
        calories: 209,
      },
    ],
    oats: [
      {
        name: "OATS",
        quantity: "10g",
        protein: 1.25,
        fat: 0.625,
        carbs: 6.75,
        calories: 37.5,
      },
      {
        name: "Steel Cut Oats",
        quantity: "10g",
        protein: 1.7,
        fat: 0.7,
        carbs: 6.5,
        calories: 38,
      },
    ],
    rice: [
      {
        name: "White Rice",
        quantity: "100g",
        protein: 2.7,
        fat: 0.3,
        carbs: 28,
        calories: 130,
      },
    ],
    egg: [
      {
        name: "Whole Egg",
        quantity: "1 medium",
        protein: 6.3,
        fat: 5.3,
        carbs: 0.4,
        calories: 75,
      },
    ],
    bread: [
      {
        name: "Whole Wheat Bread",
        quantity: "1 slice",
        protein: 4,
        fat: 1,
        carbs: 15,
        calories: 81,
      },
    ],
  };

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
      setSearchResults([]);
      setSelectedFood(null);
    }
  }, [isOpen]);

  // Search for food
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const query = searchQuery.toLowerCase();

      // Find matching foods from our mock database
      const results: FoodSearchResult[] = [];
      Object.keys(mockFoodDatabase).forEach((key) => {
        if (key.includes(query)) {
          results.push(...mockFoodDatabase[key]);
        }
      });

      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  // Select a food item to display details
  const handleSelectFood = (food: FoodSearchResult) => {
    setSelectedFood(food);
  };

  // Save the selected food item
  const handleSaveFood = () => {
    if (selectedFood) {
      const foodItem: IFoodItem = {
        name: selectedFood.name,
        calories: selectedFood.calories,
        protein: selectedFood.protein,
        carbs: selectedFood.carbs,
        fat: selectedFood.fat,
      };

      onSave(foodItem, mealType);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">
            Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search foods (try 'chicken', 'oats', 'rice'...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-[#121212] border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 w-5 h-5 text-gray-500" />
            <button
              onClick={handleSearch}
              className="absolute right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 text-white"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="divide-y divide-gray-800">
              {searchResults.map((food, index) => (
                <div
                  key={index}
                  className={`p-4 cursor-pointer transition-colors duration-200 ${
                    selectedFood?.name === food.name ? "bg-[#ffffff1a]" : "hover:bg-[#ffffff0d]"
                  }`}
                  onClick={() => handleSelectFood(food)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-white">{food.name}</div>
                      <div className="text-xs text-gray-400">{food.quantity}</div>
                    </div>
                    <div className="text-orange-400 font-medium">{food.calories} kcal</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            searchQuery && (
              <div className="p-4 text-center text-gray-400">No results found. Try different keywords.</div>
            )
          )}
        </div>

        {/* Selected Food Details */}
        {selectedFood && (
          <div className="p-4 bg-[#13131f] border-t border-gray-800">
            <h4 className="font-bold text-white mb-2">{selectedFood.name}</h4>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{selectedFood.calories}</div>
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
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium"
            >
              Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
