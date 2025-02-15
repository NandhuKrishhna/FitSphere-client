import * as React from "react"
import { Check, ChevronsUpDown, Filter } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Separator } from "../../components/ui/separator"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"

const specialties = [
  { value: "all", label: "All Specialties" },
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "orthopedics", label: "Orthopedics" },
]

const languages = [
  { value: "all", label: "All Languages" },
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "mandarin", label: "Mandarin" },
]

const FiterBar = () => {
  const [open, setOpen] = React.useState(true)
  const [specialty, setSpecialty] = React.useState("")
  const [language, setLanguage] = React.useState("")
  const [gender, setGender] = React.useState<string[]>([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[200px]  lg:w-[200px] bg-gray-600 text-white"
        >
          <Filter className="mr-2 h-4 w-4" />
          {specialty || language || gender.length > 0 ? "Filters Applied" : "Filter"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[200px] bg-gray-400 p-0 text-black" align="start">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>No filter found.</CommandEmpty>
            <CommandGroup heading="Specialty">
              {specialties.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    setSpecialty(item.value === specialty ? "" : item.value)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", specialty === item.value ? "opacity-100" : "opacity-0")} />
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
                    setLanguage(item.value === language ? "" : item.value)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", language === item.value ? "opacity-100" : "opacity-0")} />
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
                    checked={gender.includes("male")}
                    onCheckedChange={(checked) => {
                      setGender(checked ? [...gender, "male"] : gender.filter((g) => g !== "male"))
                    }}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
              </CommandItem>
              <CommandItem>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="female"
                    checked={gender.includes("female")}
                    onCheckedChange={(checked) => {
                      setGender(checked ? [...gender, "female"] : gender.filter((g) => g !== "female"))
                    }}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="p-4">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FiterBar