import OptionSelector from "@/components/App/OptionSelector";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import useUserHealthDetails from "@/hooks/App/useUpdateUserHealthDetails";
import { useNavigate } from "react-router-dom";

type WeekOption = "1" | "2" | "3" | "4";

export default function WeeksGoalSelector() {
  const navigate = useNavigate();
  const { value: selectedWeeks, setValue: setSelectedWeeks, isSelected } = useSelectorState<WeekOption>("weeksToGoal");
  const { onSubmit, isLoading } = useUserHealthDetails();

  const weekOptions = [
    {
      id: "1",
      title: "1 Week",
      description: "Quick results, intense plan",
    },
    {
      id: "2",
      title: "2 Weeks",
      description: "Balanced approach",
    },
    {
      id: "3",
      title: "3 Weeks",
      description: "Steady progress",
    },
    {
      id: "4",
      title: "4 Weeks",
      description: "Gradual, sustainable change",
    },
  ];

  const handleSave = async () => {
    if (selectedWeeks) {
      await onSubmit();
      navigate("/home");
    }
  };

  return (
    <PageLayout
      title="How quickly do you want results?"
      subtitle="Select the number of weeks to achieve your goals"
      step={5}
      totalSteps={6}
      backAction={() => navigate("/activity")}
      nextAction={handleSave}
      nextDisabled={!isSelected || isLoading}
      nextLabel={isLoading ? "Saving..." : "Save"}
    >
      <OptionSelector
        options={weekOptions}
        selectedValue={selectedWeeks}
        onChange={(value) => setSelectedWeeks(value as WeekOption)}
        layout="grid"
      />
    </PageLayout>
  );
}
