interface MacrosCardProps {
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

export default function MacrosCard({
  totalProtein,
  totalCarbs,
  totalFats,
  proteinPercentage,
  carbsPercentage,
  fatsPercentage,
}: MacrosCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Macros</h2>
      </div>
      <div className="space-y-4">
        <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-yellow-500" style={{ width: `${fatsPercentage}%` }}></div>
            <div className="h-full bg-purple-500" style={{ width: `${carbsPercentage}%` }}></div>
            <div className="h-full bg-green-500" style={{ width: `${proteinPercentage}%` }}></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
            <span>Fats: {totalFats}g</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
            <span>Carbs: {totalCarbs}g</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            <span>Protein: {totalProtein}g</span>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-full font-medium">
          Set Nutrition Goals
        </button>
      </div>
    </div>
  );
}
