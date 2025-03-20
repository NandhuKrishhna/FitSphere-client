import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  type?: string;
  placeholder: string;
  icon?: React.ReactNode;
  register: UseFormRegisterReturn;
  defaultValue?: string;
}

const InputField: FC<InputFieldProps> = ({ id, type = "text", placeholder, icon, register, defaultValue }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {placeholder}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          {...register}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 caret-white"
        />
        {icon && <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500">{icon}</div>}
      </div>
    </div>
  );
};

export default InputField;