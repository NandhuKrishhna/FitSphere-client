import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/App/ProgressBar";

export default function ActivityLevelSelectionPage() {
  const [activityLevel, setActivityLevel] = useState<string | null>(null);

  useEffect(() => {
    const savedActivityLevel = localStorage.getItem("activityLevel");
    if (savedActivityLevel) {
      setActivityLevel(savedActivityLevel);
    }
  }, []);

  const handleActivitySelect = (selectedLevel: string) => {
    setActivityLevel(selectedLevel);
    localStorage.setItem("activityLevel", selectedLevel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black text-white flex flex-col">
      <header className="p-6">
        <h1 className="text-2xl font-bold italic">
          FitSphere <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full ml-1"></span>
        </h1>
      </header>

      <ProgressBar step={2} totalSteps={7} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-medium mb-16 text-center">How active are you?</h2>
          <div className="flex flex-col space-y-4 w-full max-w-md">
            {["Little or No Activity", "Lightly Active", "Moderately Active", "Very Active"].map((level, index) => (
              <button
                key={index}
                onClick={() => handleActivitySelect(level)}
                className={`w-full py-4 rounded-lg flex items-center justify-center transition-all text-lg font-medium border-2 border-transparent ${
                  activityLevel === level
                    ? "bg-purple-700 border-purple-400"
                    : "bg-white text-purple-900 hover:bg-gray-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between">
        <button className="flex items-center justify-center px-6 py-3 rounded-full bg-purple-900 hover:bg-purple-800 transition-colors">
          <ArrowLeft className="mr-2" size={18} />
          Back
        </button>
        <button
          className={`flex items-center justify-center px-6 py-3 rounded-full transition-colors ${
            !activityLevel ? "bg-purple-900/50 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"
          }`}
          disabled={!activityLevel}
        >
          Next
          <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
}
