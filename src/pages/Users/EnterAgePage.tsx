import NumberScroller from "@/components/App/NumberScroller";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import { useNavigate } from "react-router-dom";

export default function AgeSelector() {
  const navigate = useNavigate();
  const { value: selectedAge, setValue: setSelectedAge } = useSelectorState<number>("age", 20);

  return (
    <PageLayout
      title="What's your age?"
      subtitle="Scroll to select your age"
      step={1}
      totalSteps={6}
      nextAction={() => navigate("/gender")}
      nextDisabled={!selectedAge}
    >
      <NumberScroller value={selectedAge || 20} onChange={setSelectedAge} min={15} max={100} />
    </PageLayout>
  );
}
