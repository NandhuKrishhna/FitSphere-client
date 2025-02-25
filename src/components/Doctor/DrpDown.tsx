import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface DropdownProps<T> {
  title: string;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  className?: string;
}

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
