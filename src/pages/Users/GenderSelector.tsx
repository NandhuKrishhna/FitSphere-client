import ProgressBar from "@/components/App/ProgressBar";
import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMars, FaVenus } from "react-icons/fa";

type Gender = "male" | "female" | null;

export default function GenderSelector() {
  const [selectedGender, setSelectedGender] = useState<Gender>(() => {
    const storedGender = localStorage.getItem("selectedGender");
    return (storedGender as Gender) || null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedGender) {
      localStorage.setItem("selectedGender", selectedGender);
    }
  }, [selectedGender]);

  const handleNextPage = () => {
    if (selectedGender) {
      navigate("/height");
    }
  };

  const handlePrevPage = () => {
    navigate("/age");
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={2} totalSteps={6} />

      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">what's your gender?</h1>
        <p className="mb-16">Select your gender</p>

        <div className="flex justify-center gap-8 w-full">
          <div
            onClick={() => setSelectedGender("male")}
            className={`
              flex flex-col items-center justify-center p-8 rounded-xl cursor-pointer transition-all duration-300
              ${selectedGender === "male" ? "bg-purple-600 shadow-lg scale-105" : "bg-purple-800 hover:bg-purple-700"}
            `}
          >
            <FaMars size={64} className={`${selectedGender === "male" ? "text-yellow-300" : "text-white"}`} />
            <span
              className={`mt-4 text-xl font-semibold ${selectedGender === "male" ? "text-yellow-300" : "text-white"}`}
            >
              Male
            </span>
          </div>

          <div
            onClick={() => setSelectedGender("female")}
            className={`
              flex flex-col items-center justify-center p-8 rounded-xl cursor-pointer transition-all duration-300
              ${selectedGender === "female" ? "bg-purple-600 shadow-lg scale-105" : "bg-purple-800 hover:bg-purple-700"}
            `}
          >
            <FaVenus size={64} className={`${selectedGender === "female" ? "text-yellow-300" : "text-white"}`} />
            <span
              className={`mt-4 text-xl font-semibold ${selectedGender === "female" ? "text-yellow-300" : "text-white"}`}
            >
              Female
            </span>
          </div>
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
          disabled={!selectedGender}
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
