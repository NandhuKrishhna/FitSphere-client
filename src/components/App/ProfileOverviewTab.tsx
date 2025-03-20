import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface User {
  name?: string;
  email?: string;
  profilePicture?: string;
}

interface HealthDetails {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  targetWeight: number;
  weeksToGoal: number;
  targetDailyCalories: number;
}

interface HealthData {
  userHealthDetails: HealthDetails;
}

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightData {
  weightProgress: WeightEntry[];
}

interface OverviewTabProps {
  auth: User | null;
  healthData?: HealthData;
  healthLoading: boolean;
  weightData?: WeightData;
  weightLoading: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  auth,
  healthData,
  healthLoading,
  weightData,
  weightLoading,
}) => {
  const formattedWeightData = weightData?.weightProgress?.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: entry.weight,
  })) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Weight Progress Chart */}
      <WeightProgressChart 
        weightLoading={weightLoading} 
        formattedWeightData={formattedWeightData} 
      />

      {/* Profile Information */}
      <ProfileInfoCard auth={auth} healthData={healthData} />

      {/* Health Summary */}
      <HealthSummaryCard healthData={healthData} healthLoading={healthLoading} />
    </div>
  );
};

interface WeightProgressChartProps {
  weightLoading: boolean;
  formattedWeightData: { date: string; weight: number }[];
}

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

interface ProfileInfoCardProps {
  auth: User | null;
  healthData?: HealthData;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ auth, healthData }) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Full Name:</p>
            <p className="font-medium text-white">{auth?.name || "User Name"}</p>
          </div>
          <div>
            <p className="text-gray-400">Email:</p>
            <p className="font-medium text-white">{auth?.email || "user@example.com"}</p>
          </div>
          <div>
            <p className="text-gray-400">Age:</p>
            <p className="font-medium text-white">{healthData?.userHealthDetails?.age || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Gender:</p>
            <p className="font-medium text-white capitalize">
              {healthData?.userHealthDetails?.gender || "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface HealthSummaryCardProps {
  healthData?: HealthData;
  healthLoading: boolean;
}

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
              <p className="font-medium text-white">{healthData.userHealthDetails.weight} kg</p>
            </div>
            <div>
              <p className="text-gray-400">Target Weight:</p>
              <p className="font-medium text-white">{healthData.userHealthDetails.targetWeight} kg</p>
            </div>
            <div>
              <p className="text-gray-400">Height:</p>
              <p className="font-medium text-white">{healthData.userHealthDetails.height} cm</p>
            </div>
            <div>
              <p className="text-gray-400">Goal:</p>
              <p className="font-medium text-white capitalize">{healthData.userHealthDetails.goal}</p>
            </div>
            <div>
              <p className="text-gray-400">Activity Level:</p>
              <p className="font-medium text-white capitalize">
                {healthData.userHealthDetails.activityLevel}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Daily Calories:</p>
              <p className="font-medium text-white">
                {healthData.userHealthDetails.targetDailyCalories} kcal
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

export default OverviewTab;