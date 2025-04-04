import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthSummaryCardProps } from "@/types/types";
const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ healthData, healthLoading }) => {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-white">Health Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {healthLoading ? (
                    <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : healthData ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-400">Current Weight:</p>
                            <p className="font-medium text-white">{healthData?.userHealthDetails?.weight} kg</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Target Weight:</p>
                            <p className="font-medium text-white">{healthData?.userHealthDetails?.targetWeight} kg</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Height:</p>
                            <p className="font-medium text-white">{healthData?.userHealthDetails?.height} cm</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Goal:</p>
                            <p className="font-medium text-white capitalize">{healthData?.userHealthDetails?.goal}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Activity Level:</p>
                            <p className="font-medium text-white capitalize">
                                {healthData?.userHealthDetails?.activityLevel}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Daily Calories:</p>
                            <p className="font-medium text-white">
                                {healthData?.userHealthDetails?.targetDailyCalories} kcal
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">No health data available</p>
                )}
            </CardContent>
        </Card>
    );
};

export default HealthSummaryCard;