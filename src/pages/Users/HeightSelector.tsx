import ProgressBar from "@/components/App/ProgressBar";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HeightSelector() {
  const [selectedHeight, setSelectedHeight] = useState<number>(() => {
    const storedHeight = localStorage.getItem("selectedHeight");
    return storedHeight ? parseInt(storedHeight, 10) : 170;
  });
  const [visibleHeights, setVisibleHeights] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedHeight", selectedHeight.toString());
  }, [selectedHeight]);

  useEffect(() => {
    const newVisibleHeights = [];
    for (let i = -2; i <= 2; i++) {
      const height = selectedHeight + i;
      if (height >= 140 && height <= 220) {
        newVisibleHeights.push(height);
      }
    }
    setVisibleHeights(newVisibleHeights);
  }, [selectedHeight]);

  const handlePrevHeight = () => {
    if (selectedHeight > 140) {
      setSelectedHeight(selectedHeight - 1);
    }
  };

  const handleNextHeight = () => {
    if (selectedHeight < 220) {
      setSelectedHeight(selectedHeight + 1);
    }
  };

  const handleNextPage = () => {
    if (selectedHeight) {
      navigate("/current-weight");
    }
  };

  const handleHeightClick = (height: number) => {
    setSelectedHeight(height);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNextHeight();
    } else {
      handlePrevHeight();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <ProgressBar step={3} totalSteps={6} />
      <div className="flex-1 flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center">what's your height?</h1>
        <p className="mb-16">Scroll to select your height in cm</p>

        <div
          ref={scrollContainerRef}
          className="relative flex flex-col items-center justify-center h-60 overflow-hidden"
          onWheel={handleWheel}
        >
          {visibleHeights.map((height) => (
            <div
              key={height}
              onClick={() => handleHeightClick(height)}
              className={`
                transition-all duration-300 ease-in-out cursor-pointer text-center py-2 w-full
                ${
                  height === selectedHeight
                    ? "text-4xl font-bold text-yellow-300"
                    : Math.abs(height - selectedHeight) === 1
                    ? "text-2xl opacity-60"
                    : "text-xl opacity-40"
                }
              `}
            >
              {height} cm
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between mt-8 mb-4 max-w-md">
        <button
          onClick={() => navigate("/gender")}
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
          disabled={!selectedHeight}
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
