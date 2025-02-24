import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useSearchRecipesHook from "@/hooks/App/SearchRecipes";
import RecipeCard from "@/components/App/RecipeCard";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import useGetRecipesDetails from "@/hooks/App/getRecipesDetails";
import { useState } from "react";
import RecipeDetailsModal from "@/components/App/RecipeModal";

export default function RecipesGeneratorPage() {
  const { isLoading, handleSearch, responseData, setSearchResults, searchResults } = useSearchRecipesHook();
  const { handleGetRecipesDetails, reciepeDetails } = useGetRecipesDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecipeClick = async (recipeId: string) => {
    await handleGetRecipesDetails(recipeId.toString());
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Recipe Generator</h1>

        <div className="flex gap-4 mb-8 max-w-xl mx-auto">
          <Input
            placeholder="Enter ingredients (e.g., chicken, onion, tomato)"
            value={searchResults}
            onChange={(e) => setSearchResults(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <span className="loading loading-ring loading-sm"></span>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-48 w-full max-w-[250px] rounded-lg" />
              ))
            : responseData?.response?.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleRecipeClick(recipe.id.toString())} />
              ))}
        </div>

        <RecipeDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipeDetails={reciepeDetails?.resposse}
        />
      </div>
    </div>
  );
}
