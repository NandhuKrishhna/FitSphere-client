import NumberScroller from "@/components/App/NumberScroller";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TargetWeightSelector() {
  const navigate = useNavigate();
  const { value: currentWeight } = useSelectorState<number>("weight", 70);
  const { value: targetWeight, setValue: setTargetWeight } = useSelectorState<number>("targetWeight", currentWeight);

  const handleNextPage = () => {
    const minHealthyWeight = Math.round(currentWeight * 0.8);
    const maxHealthyWeight = Math.round(currentWeight * 1.3);
    if (targetWeight < minHealthyWeight) {
      toast.error("This target weight is too low and may be unhealthy!");
    } else if (targetWeight > maxHealthyWeight) {
      toast.error("This target weight is too high and may be unhealthy!");
    } else {
      navigate("/activity-level");
    }
  };



  return (
    <PageLayout
      title="Set Your Target Weight"
      subtitle="Scroll to select your target weight (kg)"
      step={5}
      totalSteps={7}
      backAction={() => navigate("/current-weight")}
      nextAction={handleNextPage}
      nextDisabled={!targetWeight}
    >
      <NumberScroller value={targetWeight} onChange={setTargetWeight} min={30} max={200} unit=" kg" />
    </PageLayout>
  );
}
