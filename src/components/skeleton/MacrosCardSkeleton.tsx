export default function MacrosCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-20 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-4">
                <div className="relative h-8 bg-gray-700 rounded-full"></div>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                    </div>
                </div>
                <div className="w-full h-10 bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
}