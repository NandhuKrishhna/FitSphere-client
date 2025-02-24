import { useGenerateRecipeMutation } from "@/redux/api/caloriesApi";
import { RecipeResponse } from "@/types/userTypes";
import { useState } from "react";

const useGetRecipesDetails = () => {
  const [generateRecipe, { isLoading: isRecipeDetailsLoading }] = useGenerateRecipeMutation();
  const [reciepeDetails, setReciepeDetails] = useState<RecipeResponse | null>(null);
  const handleGetRecipesDetails = async (recipeId: string) => {
    try {
      const response = await generateRecipe({ recipeId: recipeId }).unwrap();
      setReciepeDetails(response);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { handleGetRecipesDetails, isRecipeDetailsLoading, reciepeDetails };
};

export default useGetRecipesDetails;
