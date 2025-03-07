import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/App/ProgressBar";

export default function WeightSelectionPage() {
  const [selectedWeight, setSelectedWeight] = useState(() => {
    const storedWeight = localStorage.getItem("selectedWeight");
    return storedWeight ? parseFloat(storedWeight) : 70.0;
  });
  const [visibleWeights, setVisibleWeights] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedWeight", selectedWeight.toString());
  }, [selectedWeight]);

  useEffect(() => {
    const newVisibleWeights = [];
    for (let i = -2; i <= 2; i++) {
      const weight = selectedWeight + i;
      if (weight >= 30 && weight <= 200) {
        newVisibleWeights.push(weight);
      }
    }
    setVisibleWeights(newVisibleWeights);
  }, [selectedWeight]);

  const handlePrevWeight = () => {
    if (selectedWeight > 30) {
      setSelectedWeight((prev) => parseFloat((prev - 1).toFixed(1)));
    }
  };

  const handleNextWeight = () => {
    if (selectedWeight < 200) {
      setSelectedWeight((prev) => parseFloat((prev + 1).toFixed(1)));
    }
  };

  const handleNextPage = () => {
    navigate("/target-weight");
  };

  const handleWeightClick = (weight: number) => {
    setSelectedWeight(weight);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNextWeight();
    } else {
      handlePrevWeight();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={4} totalSteps={6} />
      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">What's your current weight?</h1>
        <p className="mb-16">Scroll to select your weight (kg)</p>

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
                  weight === selectedWeight
                    ? "text-4xl font-bold text-yellow-300"
                    : Math.abs(weight - selectedWeight) === 1
                    ? "text-2xl opacity-60"
                    : "text-xl opacity-40"
                }
              `}
            >
              {weight}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between mt-8 mb-4 max-w-md">
        <button
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
          onClick={() => navigate("/height")}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <button
          onClick={handleNextPage}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
