import NumberScroller from "@/components/App/NumberScroller";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import { useNavigate } from "react-router-dom";

export default function WeightSelector() {
  const navigate = useNavigate();
  const { value: selectedWeight, setValue: setSelectedWeight } = useSelectorState<number>("weight", 70);

  return (
    <PageLayout
      title="What's your current weight?"
      subtitle="Scroll to select your weight (kg)"
      step={4}
      totalSteps={6}
      backAction={() => navigate("/height")}
      nextAction={() => navigate("/target-weight")}
      nextDisabled={!selectedWeight}
    >
      <NumberScroller value={selectedWeight || 70} onChange={setSelectedWeight} min={30} max={200} unit=" kg" />
    </PageLayout>
  );
}
