export default function MealListSkeleton({ mealCount = 4 }) {
    return (
        <div className="space-y-4 animate-pulse">
            {[...Array(mealCount)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4"></div>
                            <div>
                                <div className="h-5 w-24 bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 w-36 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
                            <div className="w-5 h-5 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
