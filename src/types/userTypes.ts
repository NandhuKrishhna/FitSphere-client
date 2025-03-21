export interface ErrorResponse {
  data: {
    errors?: Array<{ path: string; message: string }>;
    message?: string;
  };
  status: number;
}

// types/recipe.ts

export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Measures {
  us: Measure;
  metric: Measure;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

export interface Step {
  number: number;
  step: string;
  ingredients: Array<{
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }>;
  equipment: Array<{
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }>;
  length?: {
    number: number;
    unit: string;
  };
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string | null;
  sourceName: string;
  sourceUrl: string;
  spoonacularScore: number;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  summary: string;
}

export interface RecipeResponse {
  success: boolean;
  message: string;
  resposse: Recipe;
}


export type UserQueryParams ={
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  isVerfied?: string;
  isActive? :string;
  isApproved? : string;
  name?: string;
  email?: string;
};


export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  isPremium: boolean;
  isVerfied: boolean;
  status: string;
}