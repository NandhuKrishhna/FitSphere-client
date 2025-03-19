// ActiveFilters.tsx
import React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface ActiveFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterType: string | null
  setFilterType: (type: string | null) => void
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  setQueryParams: React.Dispatch<React.SetStateAction<any>>
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  dateRange,
  setDateRange,
  setQueryParams,
}) => {
  if (!searchQuery && !filterType && !dateRange) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {searchQuery}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => {
              setSearchQuery("")
              setQueryParams((prev) => ({ ...prev, page: 1 }))
            }}
          />
        </Badge>
      )}
      {filterType && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Type: {filterType}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => {
              setFilterType(null)
              setQueryParams((prev) => ({ ...prev, page: 1 }))
            }}
          />
        </Badge>
      )}
      {dateRange?.from && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Date: {format(dateRange.from, "MMM dd, yyyy")}
          {dateRange.to ? ` - ${format(dateRange.to, "MMM dd, yyyy")}` : ""}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => {
              setDateRange(undefined)
              setQueryParams((prev) => ({ ...prev, page: 1 }))
            }}
          />
        </Badge>
      )}
    </div>
  )
}