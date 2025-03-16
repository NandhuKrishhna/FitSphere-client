export interface IFoodItem {
  quantity:string
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  _id?: string;
}

export interface MealData {
  breakfast: IFoodItem[];
  lunch: IFoodItem[];
  dinner: IFoodItem[];
  snacks: IFoodItem[];
}

export interface FoodLogResponse {
  message: string;
  success: boolean;
  response: {
    _id: string;
    userId: string;
    date: string;
    totalCalories: number;
    totalCarbs: number;
    totalFats: number;
    totalProtien: number;
    requiredCalories: number;
    meals: MealData;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
