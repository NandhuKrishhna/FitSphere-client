import NumberScroller from "@/components/App/NumberScroller";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import { useNavigate } from "react-router-dom";

export default function HeightSelector() {
  const navigate = useNavigate();
  const { value: selectedHeight, setValue: setSelectedHeight } = useSelectorState<number>("height", 170);

  return (
    <PageLayout
      title="what's your height?"
      subtitle="Scroll to select your height in cm"
      step={3}
      totalSteps={6}
      backAction={() => navigate("/gender")}
      nextAction={() => navigate("/current-weight")}
      nextDisabled={!selectedHeight}
    >
      <NumberScroller value={selectedHeight || 170} onChange={setSelectedHeight} min={140} max={220} unit=" cm" />
    </PageLayout>
  );
}
