import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionSelector from "@/components/App/OptionSelector";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import useUserHealthDetails from "@/hooks/App/useUpdateUserHealthDetails";

type WeekOption = "1" | "2" | "3" | "4";

export default function WeeksGoalSelector() {
  const navigate = useNavigate();
  const { onSubmit, isLoading } = useUserHealthDetails();

  // Get the initial value from localStorage
  const [selectedWeeks, setSelectedWeeks] = useState<WeekOption | null>(
    (localStorage.getItem("weeksToGoal") as WeekOption) || null
  );

  const weekOptions = [
    { id: "1", title: "1 Week", description: "Quick results, intense plan" },
    { id: "2", title: "2 Weeks", description: "Balanced approach" },
    { id: "3", title: "3 Weeks", description: "Steady progress" },
    { id: "4", title: "4 Weeks", description: "Gradual, sustainable change" },
  ];

  const handleSave = async () => {
    if (selectedWeeks) {
      await onSubmit();
      localStorage.removeItem("signupInProgress");
      localStorage.removeItem("age");
      localStorage.removeItem("gender");
      localStorage.removeItem("height");
      localStorage.removeItem("weight");
      localStorage.removeItem("activityLevel");
      localStorage.removeItem("targetWeight");
      localStorage.removeItem("weeksToGoal");
      console.log("local storage cleared");
      navigate("/home");
    }
  };

  return (
    <PageLayout
      title="How quickly do you want results?"
      subtitle="Select the number of weeks to achieve your goals"
      step={7}
      totalSteps={7}
      backAction={() => navigate("/activity-level")}
      nextAction={handleSave}
      nextDisabled={!selectedWeeks || isLoading}
      nextLabel={isLoading ? "Saving..." : "Save"}
    >
      <OptionSelector
        options={weekOptions}
        selectedValue={selectedWeeks}
        onChange={(value) => {
          console.log("Setting weeksToGoal to:", value);
          setSelectedWeeks(value as WeekOption);
          localStorage.setItem("weeksToGoal", value);
        }}
        layout="grid"
      />
    </PageLayout>
  );
}
