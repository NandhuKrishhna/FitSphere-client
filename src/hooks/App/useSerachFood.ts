import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchFoodQuery } from "@/redux/api/caloriesApi";
import useDebounce from "@/hooks/DebounceHook"; // Import the debounce hook

const useSearchFood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(50);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isFetching, error } = useSearchFoodQuery(
    { query: debouncedSearchQuery, quantity },
    { skip: debouncedSearchQuery.length < 2 }
  );

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch food data. Please try again.");
    }
  }, [error]);

  return {
    searchQuery,
    setSearchQuery,
    quantity,
    setQuantity,
    searchResults: data?.foodDetails || [],
    isLoading: isFetching,
  };
};

export default useSearchFood;
