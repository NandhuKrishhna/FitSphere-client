import { useEffect } from "react";
import type { IFoodItem } from "@/types/food";

export const useFoodSearchEffects = (
    editMode: boolean,
    foodToEdit: IFoodItem | null,
    isOpen: boolean,
    setSelectedFood: (food: IFoodItem | null) => void,
    setQuantity: (quantity: number) => void,
    setSearchQuery: (query: string) => void,
    searchQuery: string,
    resultsArray: IFoodItem[],
    selectedFood: IFoodItem | null,
    onClose: () => void,
    modalRef: React.RefObject<HTMLDivElement>
) => {
    useEffect(() => {
        if (editMode && foodToEdit && isOpen) {
            setSelectedFood(foodToEdit);
            const quantityStr = foodToEdit.quantity || "100g";
            const quantityNum = Number.parseInt(quantityStr.replace(/[^0-9]/g, ""));
            setQuantity(quantityNum || 100);
            setSearchQuery(foodToEdit.name);
        }
    }, [editMode, foodToEdit, isOpen, setQuantity, setSearchQuery]);

    useEffect(() => {
        if (!editMode || (editMode && searchQuery !== foodToEdit?.name)) {
            if (searchQuery && searchQuery.length > 2) {
                setSelectedFood(null);
            }
        }
    }, [searchQuery, editMode, foodToEdit?.name]);

    useEffect(() => {
        if (selectedFood && resultsArray.length > 0) {
            const updatedFood = resultsArray.find((food) => food.name === selectedFood.name);
            if (updatedFood) {
                setSelectedFood(updatedFood);
            }
        }
    }, [resultsArray, selectedFood]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            if (!editMode) {
                setSearchQuery("");
                setSelectedFood(null);
                setQuantity(100);
            }
        }
    }, [isOpen, setQuantity, setSearchQuery, editMode]);
};

export const getActionText = (editMode: boolean, quantity: number, mealType: string) =>
    editMode ? `Update ${quantity}g in ${mealType}` : `Add ${quantity}g to ${mealType}`;
