import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IPaginationProps } from "@/types/types"


const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="text-sm text-gray-400">
        Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to{" "}
        {Math.min(totalItems, currentPage * itemsPerPage)} of {totalItems} transactions
      </div>
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-l-md border border-zinc-600 bg-zinc-700 text-sm font-medium text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-3 py-2 border-t border-b border-zinc-600 bg-zinc-700 text-sm font-medium text-white">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-2 rounded-r-md border border-zinc-600 bg-zinc-700 text-sm font-medium text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}

export default Pagination