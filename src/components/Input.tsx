import React, { FC, useState } from "react";
import { Lock, Unlock } from "lucide-react"; // Importing Lock and Unlock icons

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<{ className?: string }>;
  isPassword?: boolean; // Flag to indicate if the input is a password field
}

const Input: FC<InputProps> = ({ icon: Icon, isPassword, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-6">
      {/* Icon on the left */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="text-black size-4" />
      </div>

      {/* Input field */}
      <input
        {...props}
        type={isPassword && !showPassword ? "password" : "text"} // Toggle password visibility
        className="w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg text-sm text-white placeholder-gray-400 transition duration-200"
      />

      {/* Toggle button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
        >
          {showPassword ? (
            <Unlock className="w-5 h-5" /> 
          ) : (
            <Lock className="w-5 h-5" /> 
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
