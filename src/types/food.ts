export interface IFoodItem {
  quantity: string
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
export interface FoodSearchModalProps {
  isOpen: boolean
  onClose: () => void
  mealType: string
  editMode?: boolean
  foodToEdit?: IFoodItem | null
  selectedDay: string
}

export interface MacrosCardProps {
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

export interface MealType {
  id: string
  type: string
  recommended: string
  itemCount: number
  totalCalories: number
}

export interface MealData {
  breakfast: IFoodItem[]
  lunch: IFoodItem[]
  dinner: IFoodItem[]
  snacks: IFoodItem[]
}

export interface MealListProps {
  mealTypes: MealType[]
  meals: MealData | undefined
  selectedDay: string
  handleOpenAddFoodModal: (mealId: string) => void
  handleOpenEditFoodModal: (mealId: string, foodItem: IFoodItem) => void
  handleDeleteFood: (foodId: string | undefined, date: string, mealType: string) => void
  loadingItems: { [key: string]: boolean }
}

export interface FoodItemsListProps {
  mealType: string
  items: IFoodItem[]
  handleDeleteFood: (foodId: string | undefined, date: string, mealType: string) => void
  handleEditFood: (foodItem: IFoodItem, date: string,) => void
  selectedDay: string
  loadingItems: { [key: string]: boolean }
}