import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, CreditCard, Mail, User, Wallet } from "lucide-react"
import { TransactionTypeBadge } from "./transaction-status-badge"
import { TransactionStatusBadge } from "./transaction-type-badge"
import { Transaction } from "@/types/transaction"

interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  if (!transaction) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date)
  }
  const formatPaymentType = (type: string) => {
    return type.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Transaction Details</DialogTitle>
          <DialogDescription className="text-gray-400">Complete information about this transaction</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Transaction Summary */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-white">Transaction Summary</h3>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(transaction.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TransactionTypeBadge type={transaction.type} />
                <TransactionStatusBadge status={transaction.status} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">Transaction ID</span>
                </div>
                <p className="font-mono text-sm">{transaction._id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="text-sm">Payment Method</span>
                </div>
                <p className="capitalize">{transaction.method}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="text-sm">Payment Type</span>
                </div>
                <p>{formatPaymentType(transaction.paymentType)}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">Amount</span>
                </div>
                <p
                  className={`text-lg font-bold ${transaction.type === "credit" ? "text-indigo-400" : "text-red-400"}`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Details */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">From</h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-indigo-600">
                  <AvatarImage src={transaction.fromDetails.profilePicture} alt={transaction.fromDetails.name} />
                  <AvatarFallback className="bg-indigo-900 text-white">
                    {transaction.fromDetails.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-indigo-400" />
                    <p className="font-medium">{transaction.fromDetails.name}</p>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-indigo-400" />
                    <p className="text-sm text-gray-300">{transaction.fromDetails.email}</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">To</h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-indigo-600">
                  <AvatarImage src={transaction.toDetails.profilePicture} alt={transaction.toDetails.name} />
                  <AvatarFallback className="bg-indigo-900 text-white">
                    {transaction.toDetails.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-indigo-400" />
                    <p className="font-medium">{transaction.toDetails.name}</p>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-indigo-400" />
                    <p className="text-sm text-gray-300">{transaction.toDetails.email}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

