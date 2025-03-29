import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Loader, Save, X } from "lucide-react";
import useUpdateUserHealthDetails from "@/hooks/App/useUpdateHealthDetails";

interface HealthDetails {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  targetWeight: number;
  weeksToGoal: number;
  targetDailyCalories?: number;
}

interface HealthData {
  userHealthDetails: HealthDetails;
}

interface HealthDetailsTabProps {
  healthData?: HealthData;
  healthLoading: boolean;
}

const UserHealthDetailsTab: React.FC<HealthDetailsTabProps> = ({ healthData, healthLoading }) => {
  const { handleUpdateUserHealthDetails, isUpdatingUser } = useUpdateUserHealthDetails();
  const [editingHealth, setEditingHealth] = useState(false);
  const [healthForm, setHealthForm] = useState<HealthDetails>({
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activityLevel: "",
    goal: "",
    targetWeight: 0,
    weeksToGoal: 0,
  });

  useEffect(() => {
    if (healthData && healthForm.age === 0) {
      setHealthForm({
        age: healthData.userHealthDetails.age,
        gender: healthData.userHealthDetails.gender,
        height: healthData.userHealthDetails.height,
        weight: healthData.userHealthDetails.weight,
        activityLevel: healthData.userHealthDetails.activityLevel,
        goal: healthData.userHealthDetails.goal,
        targetWeight: healthData.userHealthDetails.targetWeight,
        weeksToGoal: healthData.userHealthDetails.weeksToGoal,
      });
    }
  }, [healthData, healthForm.age]);

  const handleSave = () => {
    setHealthForm((prev) => {
      handleUpdateUserHealthDetails(prev);
      return prev;
    });
    setEditingHealth(false);
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Health Details</CardTitle>
          <CardDescription className="text-gray-400">Update your health information</CardDescription>
        </div>
        {!editingHealth ? (
          <Button onClick={() => setEditingHealth(true)} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="default" size="sm">
              {isUpdatingUser ? <Loader className="animate-spin" size={15} /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
            <Button onClick={() => setEditingHealth(false)} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {healthLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                id="age"
                label="Age"
                type="number"
                value={healthForm.age}
                onChange={(e) => setHealthForm({ ...healthForm, age: parseInt(e.target.value) })}
                disabled={!editingHealth}
              />

              <div>
                <Label htmlFor="gender" className="text-gray-300">
                  Gender
                </Label>
                <Select
                  disabled={!editingHealth}
                  value={healthForm.gender}
                  onValueChange={(value) => setHealthForm({ ...healthForm, gender: value })}
                >
                  <SelectTrigger id="gender" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                id="height"
                label="Height (cm)"
                type="number"
                value={healthForm.height}
                onChange={(e) => setHealthForm({ ...healthForm, height: parseInt(e.target.value) })}
                disabled={!editingHealth}
              />

              <FormField
                id="weight"
                label="Current Weight (kg)"
                type="number"
                step="0.1"
                value={healthForm.weight}
                onChange={(e) => setHealthForm({ ...healthForm, weight: parseFloat(e.target.value) })}
                disabled={!editingHealth}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="activityLevel" className="text-gray-300">
                  Activity Level
                </Label>
                <Select
                  disabled={!editingHealth}
                  value={healthForm.activityLevel}
                  onValueChange={(value) => setHealthForm({ ...healthForm, activityLevel: value })}
                >
                  <SelectTrigger id="activityLevel" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal" className="text-gray-300">
                  Goal
                </Label>
                <Select
                  disabled={!editingHealth}
                  value={healthForm.goal}
                  onValueChange={(value) => setHealthForm({ ...healthForm, goal: value })}
                >
                  <SelectTrigger id="goal" className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                id="targetWeight"
                label="Target Weight (kg)"
                type="number"
                step="0.1"
                value={healthForm.targetWeight}
                onChange={(e) => setHealthForm({ ...healthForm, targetWeight: parseFloat(e.target.value) })}
                disabled={!editingHealth}
              />

              <FormField
                id="weeksToGoal"
                label="Weeks to Goal"
                type="number"
                value={healthForm.weeksToGoal}
                onChange={(e) => setHealthForm({ ...healthForm, weeksToGoal: parseInt(e.target.value) })}
                disabled={!editingHealth}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  step?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ id, label, type, value, onChange, disabled, step }) => {
  return (
    <div>
      <Label htmlFor={id} className="text-gray-300">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-zinc-800 border-zinc-700 text-white"
      />
    </div>
  );
};

export default UserHealthDetailsTab;