import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

type MonthSelectProps = {
  selectedDate: Date;
  onChange: (value: string) => void;
};

const MonthSelect: React.FC<MonthSelectProps> = ({ selectedDate, onChange }) => {
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder={format(selectedDate, "MMMM yyyy")} />
      </SelectTrigger>
      <SelectContent className="bg-white h-48">
        {Array.from({ length: 12 - selectedMonth }).map((_, i) => {
          const monthIndex = selectedMonth + i;
          return (
            <SelectItem key={monthIndex} value={`month-${monthIndex + 1}`}>
              {format(new Date(selectedYear, monthIndex, 1), "MMMM yyyy")}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default MonthSelect;
