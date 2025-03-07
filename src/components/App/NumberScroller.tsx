import React, { useState, useEffect, useRef } from "react";

type NumberScrollerProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit?: string;
  visibleItems?: number;
};

export default function NumberScroller({
  value,
  onChange,
  min,
  max,
  unit = "",
  visibleItems = 5,
}: NumberScrollerProps) {
  const [visibleNumbers, setVisibleNumbers] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offset = Math.floor(visibleItems / 2);
    const newVisibleNumbers = [];
    for (let i = -offset; i <= offset; i++) {
      const num = value + i;
      if (num >= min && num <= max) {
        newVisibleNumbers.push(num);
      }
    }
    setVisibleNumbers(newVisibleNumbers);
  }, [value, min, max, visibleItems]);

  const handlePrev = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleNext = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative flex flex-col items-center justify-center h-60 overflow-hidden"
      onWheel={handleWheel}
    >
      {visibleNumbers.map((num) => (
        <div
          key={num}
          onClick={() => onChange(num)}
          className={`
            transition-all duration-300 ease-in-out cursor-pointer text-center py-2 w-full
            ${
              num === value
                ? "text-4xl font-bold text-yellow-300"
                : Math.abs(num - value) === 1
                ? "text-2xl opacity-60"
                : "text-xl opacity-40"
            }
          `}
        >
          {num}
          {unit}
        </div>
      ))}
    </div>
  );
}
