export default function DaySelectorSkeleton() {
    return (
        <div className="relative bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-4 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="p-2">
                    <div className="w-5 h-5 bg-gray-700 rounded"></div>
                </div>
                <div className="flex space-x-8 overflow-x-auto scrollbar-hide px-2">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center px-1">
                            <div className="h-3 w-8 bg-gray-700 rounded mb-1"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mt-1"></div>
                            <div className="h-3 w-8 bg-gray-700 rounded mt-1"></div>
                        </div>
                    ))}
                </div>
                <div className="p-2">
                    <div className="w-5 h-5 bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    );
}