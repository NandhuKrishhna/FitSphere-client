import React from "react"
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { WalletTransactionQuery } from "@/types/wallet.types"

interface TransactionFiltersProps {
  searchQuery: string
  filterStatus: string | null
  sortConfig: {
    key: string | null
    direction: "asc" | "desc"
  }
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFilterChange: (status: string | null) => void
  onSortChange: (key: string) => void
  onClearFilters: () => void
  setQueryParams: React.Dispatch<React.SetStateAction<WalletTransactionQuery>>
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchQuery,
  filterStatus,
  sortConfig,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onClearFilters,
  setQueryParams,
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={onSearchChange}
            className="pl-9 bg-zinc-700 border-zinc-600 text-white w-full"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-zinc-700 border-zinc-600 hover:bg-zinc-600">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-zinc-800 border-zinc-700 text-white">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Transactions</h4>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Transaction Status</h5>
                <div className="flex flex-wrap gap-2 ">
                  <Badge
                    variant={filterStatus === "success" ? "default" : "outline"}
                    className="cursor-pointer text-white"
                    onClick={() => {
                      onFilterChange(filterStatus === "success" ? null : "success")
                      setQueryParams((prev) => ({ ...prev, page: 1 }))
                    }}
                  >
                    Success
                  </Badge>
                  <Badge
                    variant={filterStatus === "pending" ? "default" : "outline"}
                    className="cursor-pointer text-white"
                    onClick={() => {
                      onFilterChange(filterStatus === "pending" ? null : "pending")
                      setQueryParams((prev) => ({ ...prev, page: 1 }))
                    }}
                  >
                    Pending
                  </Badge>
                  <Badge
                    variant={filterStatus === "failed" ? "default" : "outline"}
                    className="cursor-pointer text-white"
                    onClick={() => {
                      onFilterChange(filterStatus === "failed" ? null : "failed")
                      setQueryParams((prev) => ({ ...prev, page: 1 }))
                    }}
                  >
                    Failed
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-indigo-500 border-zinc-600 hover:bg-zinc-600"
                onClick={onClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-zinc-700 border-zinc-600 hover:bg-zinc-600">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem onClick={() => onSortChange("createdAt")}>
              Date {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("amount")}>
              Amount {sortConfig.key === "amount" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("description")}>
              Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {(searchQuery || filterStatus) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  onSearchChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
                  setQueryParams((prev) => ({ ...prev, page: 1 }))
                }}
              />
            </Badge>
          )}
          {filterStatus && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filterStatus}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  onFilterChange(null)
                  setQueryParams((prev) => ({ ...prev, page: 1 }))
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </>
  )
}

export default TransactionFilters