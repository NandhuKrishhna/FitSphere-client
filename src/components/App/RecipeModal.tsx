import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Users } from "lucide-react";
import { Recipe } from "@/types/userTypes";

interface RecipeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeDetails?: Recipe;
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ isOpen, onClose, recipeDetails }) => {
  if (!recipeDetails) return null;

  const { title, readyInMinutes, servings, extendedIngredients, instructions, analyzedInstructions, diets } =
    recipeDetails;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>A detailed recipe with ingredients and cooking instructions</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Recipe Overview */}
            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1" role="status" aria-label="Cooking Time">
                <Clock className="w-4 h-4" />
                <span>{readyInMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-1" role="status" aria-label="Serving Size">
                <Users className="w-4 h-4" />
                <span>{servings} servings</span>
              </div>
            </div>

            {/* Ingredients Section */}
            <section aria-labelledby="ingredients-heading">
              <h3 id="ingredients-heading" className="text-xl font-semibold mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="font-medium">
                      {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
                    </span>
                    <span>{ingredient.nameClean || ingredient.name}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions Section */}
            <section aria-labelledby="instructions-heading">
              <h3 id="instructions-heading" className="text-xl font-semibold mb-3">
                Instructions
              </h3>
              {analyzedInstructions?.[0]?.steps ? (
                <ol className="space-y-4">
                  {analyzedInstructions[0].steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="font-bold min-w-[24px]" aria-hidden="true">
                        {index + 1}.
                      </span>
                      <p>{step.step}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="whitespace-pre-line">{instructions}</p>
              )}
            </section>

            {/* Additional Details */}
            {diets?.length > 0 && (
              <section aria-labelledby="dietary-heading">
                <h3 id="dietary-heading" className="text-xl font-semibold mb-3">
                  Dietary Information
                </h3>
                <div className="flex flex-wrap gap-2">
                  {diets.map((diet, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                      role="status"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailsModal;
