import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface TimeSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const TimeSelect: React.FC<TimeSelectProps> = ({ label, value, onChange, options }) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>
        <SelectContent className="bg-white text-purple-800">
          {options.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
