import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightProgressChartProps } from "@/types/types";


const WeightProgressChart: React.FC<WeightProgressChartProps> = ({ weightLoading, formattedWeightData }) => {
    return (
        <Card className="col-span-1 md:col-span-2 bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Weight Progress</CardTitle>
                <CardDescription className="text-gray-400">Track your weight changes over time</CardDescription>
            </CardHeader>
            <CardContent>
                {weightLoading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : formattedWeightData.length > 0 ? (
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={formattedWeightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="date" stroke="#aaa" />
                                <YAxis
                                    domain={[
                                        Math.floor(Math.min(...formattedWeightData.map((d) => d.weight)) - 1),
                                        Math.ceil(Math.max(...formattedWeightData.map((d) => d.weight)) + 1),
                                    ]}
                                    stroke="#aaa"
                                />
                                <Tooltip contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }} labelStyle={{ color: "#fff" }} />
                                <Line
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="#8884d8"
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: "#8884d8", strokeWidth: 2 }}
                                    activeDot={{ r: 8, fill: "#222", stroke: "#8884d8" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">No weight data available</div>
                )}
            </CardContent>
        </Card>
    );
};

export default WeightProgressChart;