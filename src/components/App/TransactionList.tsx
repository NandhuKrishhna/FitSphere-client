import React from "react"
import { Button } from "@/components/ui/button"
import TransactionItem from "./TransactionItem"
import { TransactionListProps } from "@/types/types"

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  searchQuery,
  filterStatus,
  currency,
  clearFilters,
}) => {
  return (
    <div className="space-y-4">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} currency={currency} />
        ))
      ) : (
        <div className="text-center py-8 bg-zinc-700 rounded-lg">
          <p className="text-sm text-gray-400">No transactions found.</p>
          {(searchQuery || filterStatus) && (
            <Button variant="link" className="text-purple-400 mt-2" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default TransactionList