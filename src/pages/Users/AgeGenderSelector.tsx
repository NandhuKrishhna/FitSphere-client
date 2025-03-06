"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaMars, FaVenus } from "react-icons/fa";

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="flex space-x-2 w-[60%] max-w-md">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`h-1 rounded-full flex-1 ${i < step ? "bg-purple-400" : "bg-gray-600"}`} />
        ))}
      </div>
    </div>
  );
};

export default function GenderSelectionPage() {
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    const savedGender = localStorage.getItem("gender");
    if (savedGender) {
      setGender(savedGender);
    }
  }, []);

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    localStorage.setItem("gender", selectedGender);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black text-white flex flex-col">
      <header className="p-6">
        <h1 className="text-2xl font-bold italic">
          FitSphere <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full ml-1"></span>
        </h1>
      </header>

      <ProgressBar step={2} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-medium mb-16 text-center">What's your gender?</h2>
          <div className="flex space-x-8">
            <button
              onClick={() => handleGenderSelect("male")}
              className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center transition-all ${
                gender === "male"
                  ? "bg-purple-700 border-2 border-purple-400"
                  : "bg-white text-purple-900 hover:bg-gray-200"
              }`}
            >
              <FaMars className="w-10 h-10" />
              <span className="mt-2">Male</span>
            </button>
            <button
              onClick={() => handleGenderSelect("female")}
              className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center transition-all ${
                gender === "female"
                  ? "bg-purple-700 border-2 border-purple-400"
                  : "bg-white text-purple-900 hover:bg-gray-200"
              }`}
            >
              <FaVenus className="w-10 h-10" />
              <span className="mt-2">Female</span>
            </button>
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
            !gender ? "bg-purple-900/50 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"
          }`}
          disabled={!gender}
        >
          Next
          <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
}
