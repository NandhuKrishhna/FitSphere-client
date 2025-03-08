import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorResponse } from "../LoginHook";
import { useSearchFoodMutation } from "@/redux/api/caloriesApi";

interface FoodItem {
  name: string;
  quantity: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

interface FoodSearchResponse {
  foodDetails: FoodItem[];
}

const useSearchFood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [searchFood, { isLoading }] = useSearchFoodMutation();

  const onSearchFood = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const response: FoodSearchResponse = await searchFood({ query: searchQuery }).unwrap();
      setSearchResults(response.foodDetails);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err?.data?.message) return toast.error(err.data.message);
      toast.error("Failed to fetch food data. Please try again.");
    }
  };

  return { searchQuery, setSearchQuery, searchResults, isLoading, onSearchFood };
};

export default useSearchFood;
