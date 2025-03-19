import React from "react"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  _id: string
  description: string
  createdAt: string
  amount: number
  type: string
  status: string
  currency: string
}

interface TransactionItemProps {
  transaction: Transaction
  currency: string
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, currency }) => {
  return (
    <div className="flex items-center justify-between bg-zinc-700 p-4 rounded-lg">
      <div>
        <p className="text-sm font-medium text-white">{transaction.description}</p>
        <p className="text-xs text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
        <div className="flex gap-2 mt-1">
          <Badge
            variant="outline"
            className={`text-xs ${
              transaction.type === "debit" ? "bg-red-400 text-gray-800" : "bg-green-400 text-gray-800"
            }`}
          >
            {transaction.type}
          </Badge>

          <Badge
            variant="outline"
            className={`text-xs ${
              transaction.status === "success"
                ? "text-gray-800 border-green-400 bg-green-400"
                : transaction.status === "failed"
                  ? "text-gray-800 border-red-400 bg-red-400"
                  : "text-gray-800 border-yellow-400 bg-yellow-400"
            }`}
          >
            {transaction.status}
          </Badge>
        </div>
      </div>
      <div
        className={`text-sm font-semibold ${transaction.type === "credit" ? "text-green-400" : "text-red-400"}`}
      >
        {transaction.type === "credit" ? "+" : "-"}
        {currency} {Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  )
}

export default TransactionItem