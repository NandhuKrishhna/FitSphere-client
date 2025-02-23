import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: Ingredient[];
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Card className="w-full max-w-[250px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/10 backdrop-blur-sm">
      <div className="relative h-40 overflow-hidden">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold line-clamp-2 text-white">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <h3 className="text-sm font-medium mb-2 text-white/80">Ingredients:</h3>
        <ul className="text-xs text-white/70 space-y-1">
          {recipe.usedIngredients.map((ingredient, index) => (
            <li key={index} className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-primary mr-2 flex items-center justify-center text-xs text-black">
                {index + 1}
              </span>
              {ingredient.name} ({ingredient.amount} {ingredient.unit})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
