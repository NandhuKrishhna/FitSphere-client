const CaloriesCardSkeleton = () => {
    return (
        <div className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-24 bg-gray-700 rounded"></div>
                <div className="h-4 w-28 bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-gray-700"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="h-6 w-16 bg-gray-600 rounded mb-1"></div>
                        <div className="h-3 w-14 bg-gray-600 rounded"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                        <div>
                            <div className="h-5 w-16 bg-gray-700 rounded"></div>
                            <div className="h-3 w-14 bg-gray-700 rounded mt-1"></div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                        <div>
                            <div className="h-5 w-16 bg-gray-700 rounded"></div>
                            <div className="h-3 w-14 bg-gray-700 rounded mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaloriesCardSkeleton;
