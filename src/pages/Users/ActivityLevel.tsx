import OptionSelector from "@/components/App/OptionSelector";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import { useNavigate } from "react-router-dom";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active";

export default function ActivityLevelSelector() {
  const navigate = useNavigate();
  const {
    value: selectedActivity,
    setValue: setSelectedActivity,
    isSelected,
  } = useSelectorState<ActivityLevel>("activityLevel");

  const activityOptions = [
    {
      id: "sedentary",
      title: "Sedentary",
      description: "Little to no exercise, desk job",
    },
    {
      id: "light",
      title: "Light",
      description: "Light exercise 1-3 times/week",
    },
    {
      id: "moderate",
      title: "Moderate",
      description: "Moderate exercise 3-5 times/week",
    },
    {
      id: "active",
      title: "Active",
      description: "Very active, exercise 6-7 times/week",
    },
  ];

  return (
    <PageLayout
      title="what's your activity level?"
      subtitle="Select how active you are on a weekly basis"
      step={4}
      totalSteps={6}
      backAction={() => navigate("/height")}
      nextAction={() => navigate("/select-week")}
      nextDisabled={!isSelected}
    >
      <OptionSelector
        options={activityOptions}
        selectedValue={selectedActivity}
        onChange={(value) => setSelectedActivity(value as ActivityLevel)}
        layout="grid"
      />
    </PageLayout>
  );
}
