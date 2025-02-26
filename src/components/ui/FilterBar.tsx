// FilterBar.tsx
import * as React from "react";
import { Check, Filter } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Separator } from "../../components/ui/separator";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";

const specialties = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "General Medicine", label: "General" },
  { value: "Neurology", label: "Neurology" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Emergency Medicine", label: "Emergency" },
  { value: "Endocrinology", label: "Endocrinology" },
  { value: "Orthopedics", label: "Orthopedics" },
];

const languages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Mandarin", label: "Mandarin" },
];

const experiences = [
  { value: 0, label: "Any experience" },
  { value: 5, label: "5+ years" },
  { value: 10, label: "10+ years" },
  { value: 15, label: "15+ years" },
];

interface FilterBarProps {
  onApplyFilters: (filters: { gender: string[]; specialty: string[]; language: string[]; experience: number }) => void;
}

const FilterBar = ({ onApplyFilters }: FilterBarProps) => {
  const [localGender, setLocalGender] = React.useState<string[]>([]);
  const [localSpecialty, setLocalSpecialty] = React.useState<string[]>([]);
  const [localLanguage, setLocalLanguage] = React.useState<string[]>([]);
  const [localExperience, setLocalExperience] = React.useState<number>(0);

  const handleApply = () => {
    onApplyFilters({
      gender: localGender,
      specialty: localSpecialty,
      language: localLanguage,
      experience: localExperience,
    });
  };

  const hasActiveFilters =
    localGender.length > 0 || localSpecialty.length > 0 || localLanguage.length > 0 || localExperience > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="justify-between sm: w-[50px] md:w-[100px] lg:w-[200px] bg-gray-600 text-white"
        >
          <Filter className="mr-2 h-4 w-4" />
          <span className="hidden lg:block">{hasActiveFilters ? "Filters Applied" : "Filter"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[200px] bg-gray-400 p-0 text-black" align="start">
        <Command>
          <CommandInput placeholder="Search filters..." />
          <CommandList>
            <CommandEmpty>No filters found</CommandEmpty>

            <CommandGroup heading="Specialty">
              {specialties.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    setLocalSpecialty((prev) =>
                      prev.includes(item.value) ? prev.filter((s) => s !== item.value) : [...prev, item.value]
                    );
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", localSpecialty.includes(item.value) ? "opacity-100" : "opacity-0")}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <Separator />

            <CommandGroup heading="Language">
              {languages.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    setLocalLanguage((prev) =>
                      prev.includes(item.value) ? prev.filter((l) => l !== item.value) : [...prev, item.value]
                    );
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", localLanguage.includes(item.value) ? "opacity-100" : "opacity-0")}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <Separator />

            <CommandGroup heading="Gender">
              <CommandItem>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="male"
                    checked={localGender.includes("Male")}
                    onCheckedChange={(checked) => {
                      setLocalGender((prev) => (checked ? [...prev, "Male"] : prev.filter((g) => g !== "Male")));
                    }}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
              </CommandItem>
              <CommandItem>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="female"
                    checked={localGender.includes("Female")}
                    onCheckedChange={(checked) => {
                      setLocalGender((prev) => (checked ? [...prev, "Female"] : prev.filter((g) => g !== "Female")));
                    }}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </CommandItem>
            </CommandGroup>

            <Separator />

            <CommandGroup heading="Experience">
              {experiences.map((item) => (
                <CommandItem key={item.value} onSelect={() => setLocalExperience(item.value)}>
                  <Check className={cn("mr-2 h-4 w-4", localExperience === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="p-4">
          <Button className="w-full" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterBar;
