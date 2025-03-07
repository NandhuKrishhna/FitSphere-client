import ProgressBar from "@/components/App/ProgressBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | null;

export default function ActivityLevelSelector() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityLevel>(() => {
    const storedActivity = localStorage.getItem("selectedActivity");
    return (storedActivity as ActivityLevel) || null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedActivity) {
      localStorage.setItem("selectedActivity", selectedActivity);
    }
  }, [selectedActivity]);

  const handleNextPage = () => {
    if (selectedActivity) {
      navigate("/goals");
    }
  };

  const handlePrevPage = () => {
    navigate("/height");
  };

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
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={5} totalSteps={6} />

      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">what's your activity level?</h1>
        <p className="mb-10">Select how active you are on a weekly basis</p>

        <div className="grid grid-cols-1 gap-4 w-full">
          {activityOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedActivity(option.id as ActivityLevel)}
              className={`
                flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-300
                ${
                  selectedActivity === option.id
                    ? "bg-purple-600 shadow-lg border-2 border-yellow-300"
                    : "bg-purple-800 hover:bg-purple-700 border-2 border-transparent"
                }
              `}
            >
              <span
                className={`text-xl font-semibold ${selectedActivity === option.id ? "text-yellow-300" : "text-white"}`}
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
          onClick={handleNextPage}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedActivity}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
