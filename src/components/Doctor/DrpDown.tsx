import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DropdownProps } from "@/types/types";



const Dropdown = <T extends string>({ title, options, onChange, className }: DropdownProps<T>) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={`w-40 sm:w-30 bg-indigo-400 ${className}`}>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent className="bg-indigo-300">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
