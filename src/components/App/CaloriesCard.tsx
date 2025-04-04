import { CircularProgress } from "@/components/App/CircularProgress";
import { CaloriesCardProps } from "@/types/calories.types";


const CaloriesCard = ({ totalCalories, requiredCalories, remainingCalories }: CaloriesCardProps) => {
  return (
    <div className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Calories</h2>
        <div className="text-xs text-gray-400">Goal • {requiredCalories} kcal</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative w-28 h-28">
          <CircularProgress
            current={totalCalories}
            total={requiredCalories}
            size="sm"
            showPercentage={false}
            showValues={false}
            gradientStart="#ff6b00"
            gradientEnd="#ff9f45"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{remainingCalories}</span>
            <span className="text-xs text-gray-400">Remaining</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="text-sm">
              <div>{totalCalories} kcal</div>
              <div className="text-xs text-gray-400">Consumed</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <div className="text-sm">
              <div>0 kcal</div>
              <div className="text-xs text-gray-400">Burned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCard;
