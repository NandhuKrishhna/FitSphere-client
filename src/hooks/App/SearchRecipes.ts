import { useSearchFoodItemsMutation } from "@/redux/api/caloriesApi";
import { RecipeSearchResponse } from "@/types/calories.types";
import { useState } from "react";

const useSearchRecipesHook = () => {
  const [searchFoodItems, { isLoading }] = useSearchFoodItemsMutation();
  const [searchResults, setSearchResults] = useState("");
  const [responseData, setResponseData] = useState<RecipeSearchResponse | null>(null);

  const handleSearch = async () => {
    if (!searchResults.trim()) {
      console.error("No ingredients provided.");
      return;
    }

    try {
      const response = await searchFoodItems({ ingredients: searchResults }).unwrap();
      console.log(response);
      setResponseData(response);
      setSearchResults("");
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return {
    handleSearch,
    responseData,
    isLoading,
    setSearchResults,
    searchResults,
  };
};

export default useSearchRecipesHook;
