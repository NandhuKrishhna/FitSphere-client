import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProgressBar from "@/components/App/ProgressBar";

export default function TargetWeightSelectionPage() {
  const currentWeight = parseInt(localStorage.getItem("selectedWeight") || "70", 10);
  const [targetWeight, setTargetWeight] = useState<number>(currentWeight);
  const [visibleWeights, setVisibleWeights] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("targetWeight", targetWeight.toString());
  }, [targetWeight]);

  useEffect(() => {
    updateVisibleWeights(targetWeight);
  }, [targetWeight]);

  const updateVisibleWeights = (selectedWeight: number) => {
    const newWeights = [];
    for (let i = -2; i <= 2; i++) {
      const weight = selectedWeight + i;
      if (weight >= 30 && weight <= 200) {
        newWeights.push(weight);
      }
    }
    setVisibleWeights(newWeights);
  };

  const handlePrevWeight = () => {
    if (targetWeight > 30) {
      setTargetWeight(targetWeight - 1);
    }
  };

  const handleNextWeight = () => {
    if (targetWeight < 200) {
      setTargetWeight(targetWeight + 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNextWeight();
    } else {
      handlePrevWeight();
    }
  };

  const handleWeightClick = (weight: number) => {
    setTargetWeight(weight);
  };

  const handleNextPage = () => {
    const minHealthyWeight = currentWeight * 0.8;
    const maxHealthyWeight = currentWeight * 1.3;

    if (targetWeight < minHealthyWeight) {
      toast.error("This target weight is too low and may be unhealthy!");
    } else if (targetWeight > maxHealthyWeight) {
      toast.error("This target weight is too high and may be unhealthy!");
    } else {
      navigate("/activity-level");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={5} totalSteps={6} />
      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">Set Your Target Weight</h1>
        <p className="mb-16">Scroll to select your target weight</p>

        <div
          ref={scrollContainerRef}
          className="relative flex flex-col items-center justify-center h-60 overflow-hidden"
          onWheel={handleWheel}
        >
          {visibleWeights.map((weight) => (
            <div
              key={weight}
              onClick={() => handleWeightClick(weight)}
              className={`
                transition-all duration-300 ease-in-out cursor-pointer text-center py-2 w-full
                ${
                  weight === targetWeight
                    ? targetWeight > currentWeight
                      ? "text-4xl font-bold text-green-300"
                      : "text-4xl font-bold text-red-400"
                    : Math.abs(weight - targetWeight) === 1
                    ? "text-2xl opacity-60"
                    : "text-xl opacity-40"
                }
              `}
            >
              {weight} kg
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between mt-8 mb-4 max-w-md">
        <button
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
          onClick={() => navigate("/current-weight")}
        >
          Back
        </button>

        <button
          onClick={handleNextPage}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}
