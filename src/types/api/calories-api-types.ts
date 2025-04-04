import { IFoodItem } from "../food";

export type FoodItem = {
    quantity: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    _id?: string;
};

export type Meals = {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
    snacks: FoodItem[];
};

export type FoodLogResponse = {
    success: boolean;
    message: string;
    response: {
        meals: Meals;
        _id: string;
        date: string;
        userId: string;
        __v: number;
        createdAt: string;
        requiredCalories: number;
        totalCalories: number;
        totalCarbs: number;
        totalFats: number;
        totalProtien: number;
        updatedAt: string;
    };
};
export type IDate = {
    date: string
}


export interface IAddFoodData {
    date: string;
    mealType: string;
    foodItem: IAddFoodItem
};

export interface IAddFoodItem {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    quantity: string
};


export interface IDeleteFoodItem {
    foodId: string;
    date: string;
    mealType: string
}
export interface IDeleteFoodItemResponse {
    success: boolean;
    message: string
};

export interface IEditFoodProps {
    foodId: string;
    date: string;
    foodItem: IFoodItem;
    mealType: string
};
export interface IEditFoodApiResponse {
    success: boolean;
    message: string;
    foodId: string
}