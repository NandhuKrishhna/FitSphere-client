import React from "react";
import { MessageSquare, } from "lucide-react";

type CommunicationOptionsProps = {
  onOptionClick: (option: string) => void;
};

const iconMap = {
  Chat: <MessageSquare className="w-6 h-6 text-purple-400" />,
};

const CommunicationOptions: React.FC<CommunicationOptionsProps> = ({ onOptionClick }) => {
  return (
    <div className="flex justify-center md:justify-start gap-4 mb-8">
      {["Chat"].map((option) => (
        <button
          key={option}
          onClick={() => onOptionClick(option)}
          className="flex flex-col items-center justify-center w-20 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
           {iconMap[option as keyof typeof iconMap]}
          <span className="text-purple-400 text-sm mt-2">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default CommunicationOptions;
