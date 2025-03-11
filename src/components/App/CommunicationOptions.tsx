import React from "react";

type CommunicationOptionsProps = {
  onOptionClick: (option: string) => void;
};

const CommunicationOptions: React.FC<CommunicationOptionsProps> = ({ onOptionClick }) => {
  return (
    <div className="flex justify-center md:justify-start gap-4 mb-8">
      {["Chat", "Video", "Audio"].map((option) => (
        <button
          key={option}
          onClick={() => onOptionClick(option)}
          className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <span className="text-purple-400">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default CommunicationOptions;
