import ProgressBar from "@/components/App/ProgressBar";
import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type WeekOption = "1" | "2" | "3" | "4" | null;

export default function WeeksGoalSelector() {
  const [selectedWeeks, setSelectedWeeks] = useState<WeekOption>(() => {
    const storedWeeks = localStorage.getItem("selectedWeeks");
    return (storedWeeks as WeekOption) || null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedWeeks) {
      localStorage.setItem("selectedWeeks", selectedWeeks);
    }
  }, [selectedWeeks]);

  const handleSave = () => {
    if (selectedWeeks) {
      localStorage.setItem("selectedWeeks", selectedWeeks);
      // You can add additional save logic here
      // Either navigate to a results page or show a success message
      navigate("/results");
    }
  };

  const handlePrevPage = () => {
    navigate("/activity");
  };

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

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={5} totalSteps={6} />

      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">how quickly do you want results?</h1>
        <p className="mb-10">Select the number of weeks to achieve your goals</p>

        <div className="grid grid-cols-1 gap-4 w-full">
          {weekOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedWeeks(option.id as WeekOption)}
              className={`
                flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-300
                ${
                  selectedWeeks === option.id
                    ? "bg-purple-600 shadow-lg border-2 border-yellow-300"
                    : "bg-purple-800 hover:bg-purple-700 border-2 border-transparent"
                }
              `}
            >
              <span
                className={`text-xl font-semibold ${selectedWeeks === option.id ? "text-yellow-300" : "text-white"}`}
              >
                {option.title}
              </span>
              <span className="text-sm opacity-80 mt-1">{option.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between mt-8 mb-4 max-w-md">
        <button
          onClick={handlePrevPage}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedWeeks}
        >
          Save
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
