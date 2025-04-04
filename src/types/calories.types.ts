import { Slot } from "@/components/App/SlotCalender";

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

export interface CaloriesCardProps {
  totalCalories: number;
  requiredCalories: number;
  remainingCalories: number;
}
export interface CircularProgressProps {
  current: number;
  total: number;
  size?: "sm" | "md" | "lg" | "xl";
  showPercentage?: boolean;
  showValues?: boolean;
  className?: string;
  strokeWidth?: number;
  gradientStart?: string;
  gradientEnd?: string;
}

export interface CalendarProps {
  name?: string;
  dept?: string;
  slots?: {
    success: boolean;
    message: string;
    slots: Slot[];
  };
  onSlotClick: (slot: Slot) => void;
}


export interface DayInfo {
  name: string;
  date: string;
  dateObj: Date;
}

export interface DaySelectorProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}