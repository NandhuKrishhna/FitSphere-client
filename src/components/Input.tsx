import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<{ className?: string }>;
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
    
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className="text-gray-500 size-4" /> 
      </div>
      <input 
      {...props} 
      className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg   text-white placeholder-gray-400 transition duration-200'
			/>
    </div>
  );
};

export default Input;
