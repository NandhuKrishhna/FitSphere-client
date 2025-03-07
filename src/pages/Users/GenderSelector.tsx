import OptionSelector from "@/components/App/OptionSelector";
import PageLayout from "@/components/App/UserDetailsPageLayout";
import { useSelectorState } from "@/hooks/App/useSelectorState";
import { FaMars, FaVenus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Gender = "male" | "female";

export default function GenderSelector() {
  const navigate = useNavigate();
  const { value: selectedGender, setValue: setSelectedGender, isSelected } = useSelectorState<Gender>("gender");

  const genderOptions = [
    {
      id: "male",
      title: "Male",
      icon: <FaMars size={64} />,
    },
    {
      id: "female",
      title: "Female",
      icon: <FaVenus size={64} />,
    },
  ];

  return (
    <PageLayout
      title="what's your gender?"
      subtitle="Select your gender"
      step={2}
      totalSteps={6}
      backAction={() => navigate("/age")}
      nextAction={() => navigate("/height")}
      nextDisabled={!isSelected}
    >
      <OptionSelector
        options={genderOptions}
        selectedValue={selectedGender}
        onChange={(value) => setSelectedGender(value as Gender)}
        layout="flex"
      />
    </PageLayout>
  );
}
