export interface Ingredient {
  id: number;
  aisle?: string;
  amount: number;
  image: string;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
  usedIngredientCount: number;
  usedIngredients: Ingredient[];
}

export interface RecipeSearchResponse {
  success: boolean;
  message: string;
  response: Recipe[];
}
