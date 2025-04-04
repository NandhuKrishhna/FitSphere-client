import React from "react"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,

  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-15 absolute right-12 bg-indigo-300 hover:bg-indigo-500">
        <Button variant="outline">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-slate-500">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} >
          <DropdownMenuRadioItem value="top">Booked</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Cancelled</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Pending</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
