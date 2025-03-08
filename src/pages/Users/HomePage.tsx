import { useState, useEffect } from "react";
import { FoodSearchModal } from "@/components/App/FoodSearchModal";
import { useGetUserFoodLogsDetailsQuery } from "@/redux/api/caloriesApi";
import useDeleteFood from "@/hooks/App/useDeleteFood";
import { FoodLogResponse } from "@/types/food";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import CaloriesCard from "@/components/App/CaloriesCard";
import MacrosCard from "@/components/App/MacrosCard";
import DaySelector from "@/components/App/DaySelector";
import MealList from "@/components/App/MealsList";

export default function HomePageTest() {
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split("T")[0]);
  const [foodLogs, setFoodLogs] = useState<FoodLogResponse | null>(null);
  const { data: foodLog } = useGetUserFoodLogsDetailsQuery(
    { date: selectedDay },
    { skip: !selectedDay, refetchOnMountOrArgChange: true }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");
  const { handleDeleteFood, isLoading: deleteFoodLoading } = useDeleteFood();

  useEffect(() => {
    if (foodLog) setFoodLogs(foodLog);
  }, [foodLog]);

  const mealTypes = foodLogs?.response?.meals
    ? Object.keys(foodLogs.response.meals).map((type) => ({
        id: type,
        type: type.charAt(0).toUpperCase() + type.slice(1),
        recommended: "440 - 550 kcal",
        itemCount: foodLogs?.response?.meals[type as keyof typeof foodLogs.response.meals].length,
        totalCalories: foodLogs.response.meals[type as keyof typeof foodLogs.response.meals].reduce(
          (sum, item) => sum + item.calories,
          0
        ),
      }))
    : [
        { id: "breakfast", type: "Breakfast", recommended: "440 - 550 kcal", itemCount: 0, totalCalories: 0 },
        { id: "lunch", type: "Lunch", recommended: "440 - 550 kcal", itemCount: 0, totalCalories: 0 },
        { id: "dinner", type: "Dinner", recommended: "440 - 550 kcal", itemCount: 0, totalCalories: 0 },
        { id: "snacks", type: "Snacks", recommended: "440 - 550 kcal", itemCount: 0, totalCalories: 0 },
      ];

  const totalCalories = foodLogs?.response?.totalCalories || 0;
  const requiredCalories = foodLogs?.response?.requiredCalories || 3000;
  const remainingCalories = requiredCalories - totalCalories;

  const totalProtein = foodLogs?.response?.totalProtien || 0;
  const totalCarbs = foodLogs?.response?.totalCarbs || 0;
  const totalFats = foodLogs?.response?.totalFats || 0;

  const totalMacros = totalProtein + totalCarbs + totalFats;
  const proteinPercentage = totalMacros > 0 ? (totalProtein / totalMacros) * 100 : 0;
  const carbsPercentage = totalMacros > 0 ? (totalCarbs / totalMacros) * 100 : 0;
  const fatsPercentage = totalMacros > 0 ? (totalFats / totalMacros) * 100 : 0;

  const handleOpenAddFoodModal = (mealId: string) => {
    setSelectedMealType(mealId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CaloriesCard
            totalCalories={totalCalories}
            requiredCalories={requiredCalories}
            remainingCalories={remainingCalories}
          />
          <MacrosCard
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalFats={totalFats}
            proteinPercentage={proteinPercentage}
            carbsPercentage={carbsPercentage}
            fatsPercentage={fatsPercentage}
          />
        </div>

        <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        {/*

         //* Mealist
          // TODO not responsive in sm screen
         */}
        <MealList
          mealTypes={mealTypes}
          meals={foodLogs?.response?.meals}
          selectedDay={selectedDay}
          handleOpenAddFoodModal={handleOpenAddFoodModal}
          handleDeleteFood={handleDeleteFood}
          deleteFoodLoading={deleteFoodLoading}
        />
      </main>

      <FoodSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mealType={selectedMealType} />
    </div>
  );
}
