import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AgeSelector() {
  const [selectedAge, setSelectedAge] = useState<number>(() => {
    const storedAge = localStorage.getItem("selectedAge");
    return storedAge ? parseInt(storedAge, 10) : 20;
  });
  const [visibleAges, setVisibleAges] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("selectedAge", selectedAge.toString());
  }, [selectedAge]);

  useEffect(() => {
    const newVisibleAges = [];
    for (let i = -2; i <= 2; i++) {
      const age = selectedAge + i;
      if (age >= 15 && age <= 100) {
        newVisibleAges.push(age);
      }
    }
    setVisibleAges(newVisibleAges);
  }, [selectedAge]);

  const handlePrevAge = () => {
    if (selectedAge > 15) {
      setSelectedAge(selectedAge - 1);
    }
  };

  const handleNextAge = () => {
    if (selectedAge < 100) {
      setSelectedAge(selectedAge + 1);
    }
  };

  const handleNextPage = () => {
    if (selectedAge) {
      navigate("/gender");
    }
  };

  const handleAgeClick = (age: number) => {
    setSelectedAge(age);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNextAge();
    } else {
      handlePrevAge();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">whats your age?</h1>
        <p className="mb-16">Scroll to select your age</p>

        <div
          ref={scrollContainerRef}
          className="relative flex flex-col items-center justify-center h-60 overflow-hidden"
          onWheel={handleWheel}
        >
          {visibleAges.map((age) => (
            <div
              key={age}
              onClick={() => handleAgeClick(age)}
              className={`
                transition-all duration-300 ease-in-out cursor-pointer text-center py-2 w-full
                ${
                  age === selectedAge
                    ? "text-4xl font-bold text-yellow-300"
                    : Math.abs(age - selectedAge) === 1
                    ? "text-2xl opacity-60"
                    : "text-xl opacity-40"
                }
              `}
            >
              {age}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between mt-8 mb-4 max-w-md">
        <button
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={true}
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
          disabled={selectedAge >= 100}
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
