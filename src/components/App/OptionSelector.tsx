import { OptionSelectorProps } from "@/types/types";

export default function OptionSelector<T extends string>({
  options,
  selectedValue,
  onChange,
  layout = "grid",
}: OptionSelectorProps<T>) {
  const containerClass = layout === "grid" ? "grid grid-cols-1 gap-4 w-full" : "flex justify-center gap-8 w-full";

  return (
    <div className={containerClass}>
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`
            transition-all duration-300 cursor-pointer
            ${layout === "grid"
              ? "flex flex-col p-4 rounded-xl"
              : "flex flex-col items-center justify-center p-8 rounded-xl"
            }
            ${selectedValue === option.id
              ? layout === "flex"
                ? "bg-purple-600 shadow-lg scale-105"
                : "bg-purple-600 shadow-lg border-2 border-yellow-300"
              : layout === "flex"
                ? "bg-purple-800 hover:bg-purple-700"
                : "bg-purple-800 hover:bg-purple-700 border-2 border-transparent"
            }
          `}
        >
          {option.icon && (
            <div className={selectedValue === option.id ? "text-yellow-300" : "text-white"}>{option.icon}</div>
          )}
          <span
            className={`${layout === "flex" ? "mt-4" : ""} ${option.icon ? "mt-4" : ""} text-xl font-semibold ${selectedValue === option.id ? "text-yellow-300" : "text-white"
              }`}
          >
            {option.title}
          </span>
          {option.description && <span className="text-sm opacity-80 mt-1">{option.description}</span>}
        </div>
      ))}
    </div>
  );
}
