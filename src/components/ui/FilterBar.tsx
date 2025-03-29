import * as React from "react";
import { Check, Filter, X } from "lucide-react";
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
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  const [open, setOpen] = React.useState(false);

  const handleApply = () => {
    onApplyFilters({
      gender: localGender,
      specialty: localSpecialty,
      language: localLanguage,
      experience: localExperience,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setLocalGender([]);
    setLocalSpecialty([]);
    setLocalLanguage([]);
    setLocalExperience(0);
    onApplyFilters({
      gender: [],
      specialty: [],
      language: [],
      experience: 0,
    });
  };

  const hasActiveFilters =
    localGender.length > 0 || localSpecialty.length > 0 || localLanguage.length > 0 || localExperience > 0;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (isMobile) {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-700">
          <button
            onClick={() => toggleSection("specialty")}
            className="flex w-full items-center justify-between py-4 text-left text-white hover:text-purple-300"
          >
            <span className="text-sm font-medium">Specialty</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${openSection === "specialty" ? "rotate-180" : ""}`}
            />
          </button>
          {openSection === "specialty" && (
            <div className="pb-4">
              <div className="grid grid-cols-2 gap-2 mt-2">
                {specialties.map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`specialty-${item.value}`}
                      checked={localSpecialty.includes(item.value)}
                      onCheckedChange={(checked) => {
                        setLocalSpecialty((prev) =>
                          checked ? [...prev, item.value] : prev.filter((s) => s !== item.value)
                        );
                      }}
                      className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor={`specialty-${item.value}`} className="text-gray-300">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-700">
          <button
            onClick={() => toggleSection("language")}
            className="flex w-full items-center justify-between py-4 text-left text-white hover:text-purple-300"
          >
            <span className="text-sm font-medium">Language</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSection === "language" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "language" && (
            <div className="pb-4">
              <div className="grid grid-cols-2 gap-2 mt-2">
                {languages.map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`language-${item.value}`}
                      checked={localLanguage.includes(item.value)}
                      onCheckedChange={(checked) => {
                        setLocalLanguage((prev) =>
                          checked ? [...prev, item.value] : prev.filter((l) => l !== item.value)
                        );
                      }}
                      className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor={`language-${item.value}`} className="text-gray-300">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-700">
          <button
            onClick={() => toggleSection("gender")}
            className="flex w-full items-center justify-between py-4 text-left text-white hover:text-purple-300"
          >
            <span className="text-sm font-medium">Gender</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSection === "gender" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "gender" && (
            <div className="pb-4">
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="male-mobile"
                    checked={localGender.includes("Male")}
                    onCheckedChange={(checked) => {
                      setLocalGender((prev) => (checked ? [...prev, "Male"] : prev.filter((g) => g !== "Male")));
                    }}
                    className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label htmlFor="male-mobile" className="text-gray-300">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="female-mobile"
                    checked={localGender.includes("Female")}
                    onCheckedChange={(checked) => {
                      setLocalGender((prev) => (checked ? [...prev, "Female"] : prev.filter((g) => g !== "Female")));
                    }}
                    className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label htmlFor="female-mobile" className="text-gray-300">
                    Female
                  </Label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-b border-gray-700">
          <button
            onClick={() => toggleSection("experience")}
            className="flex w-full items-center justify-between py-4 text-left text-white hover:text-purple-300"
          >
            <span className="text-sm font-medium">Experience</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${openSection === "experience" ? "rotate-180" : ""}`}
            />
          </button>
          {openSection === "experience" && (
            <div className="pb-4">
              <div className="flex flex-col space-y-2 mt-2">
                {experiences.map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`exp-${item.value}`}
                      checked={localExperience === item.value}
                      onCheckedChange={(checked) => {
                        if (checked) setLocalExperience(item.value);
                      }}
                      className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor={`exp-${item.value}`} className="text-gray-300">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleApply}>
            Apply Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={handleReset}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-300">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {localSpecialty.map((specialty) => (
              <div
                key={specialty}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-800"
              >
                {specialty}
                <button
                  className="ml-1 hover:text-white"
                  onClick={() => setLocalSpecialty((prev) => prev.filter((s) => s !== specialty))}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {localLanguage.map((language) => (
              <div
                key={language}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800"
              >
                {language}
                <button
                  className="ml-1 hover:text-white"
                  onClick={() => setLocalLanguage((prev) => prev.filter((l) => l !== language))}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {localGender.map((gender) => (
              <div
                key={gender}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-800"
              >
                {gender}
                <button
                  className="ml-1 hover:text-white"
                  onClick={() => setLocalGender((prev) => prev.filter((g) => g !== gender))}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {localExperience > 0 && (
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-900/30 text-orange-300 border border-orange-800">
                {localExperience}+ years
                <button className="ml-1 hover:text-white" onClick={() => setLocalExperience(0)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Specialty</h3>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {localSpecialty.length > 0 ? `${localSpecialty.length} selected` : "Select specialties"}
                <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-indigo-300 border-gray-700">
              <Command className="bg-transparent">
                <CommandInput placeholder="Search specialties..." className="text-gray-300" />
                <CommandList className="text-gray-300">
                  <CommandEmpty>No specialty found.</CommandEmpty>
                  <CommandGroup>
                    {specialties.map((specialty) => (
                      <CommandItem
                        key={specialty.value}
                        onSelect={() => {
                          setLocalSpecialty((prev) =>
                            prev.includes(specialty.value)
                              ? prev.filter((s) => s !== specialty.value)
                              : [...prev, specialty.value]
                          );
                        }}
                        className="hover:bg-gray-700"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            localSpecialty.includes(specialty.value) ? "opacity-100 text-purple-500" : "opacity-0"
                          )}
                        />
                        {specialty.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Language</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {localLanguage.length > 0 ? `${localLanguage.length} selected` : "Select languages"}
                <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-indigo-300 border-gray-700">
              <Command className="bg-transparent">
                <CommandInput placeholder="Search languages..." className="text-gray-300" />
                <CommandList className="text-gray-300">
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {languages.map((language) => (
                      <CommandItem
                        key={language.value}
                        onSelect={() => {
                          setLocalLanguage((prev) =>
                            prev.includes(language.value)
                              ? prev.filter((l) => l !== language.value)
                              : [...prev, language.value]
                          );
                        }}
                        className="hover:bg-gray-700"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            localLanguage.includes(language.value) ? "opacity-100 text-purple-500" : "opacity-0"
                          )}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Gender</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="male"
                checked={localGender.includes("Male")}
                onCheckedChange={(checked) => {
                  setLocalGender((prev) => (checked ? [...prev, "Male"] : prev.filter((g) => g !== "Male")));
                }}
                className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="male" className="text-gray-300">
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="female"
                checked={localGender.includes("Female")}
                onCheckedChange={(checked) => {
                  setLocalGender((prev) => (checked ? [...prev, "Female"] : prev.filter((g) => g !== "Female")));
                }}
                className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="female" className="text-gray-300">
                Female
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Experience</h3>
          <div className="space-y-2">
            {experiences.map((experience) => (
              <div key={experience.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`experience-${experience.value}`}
                  checked={localExperience === experience.value}
                  onCheckedChange={(checked) => {
                    if (checked) setLocalExperience(experience.value);
                  }}
                  className="border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor={`experience-${experience.value}`} className="text-gray-300">
                  {experience.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleApply} className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
