import { useState } from "react"
import { Search, ArrowDown, ArrowUp, Calendar, CreditCard, Wallet, Check, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

import { TransactionDetailsModal } from "./transaction-details-modal"
import { useGetTransactionsQuery } from "@/redux/api/appApi"
import { TransactionTypeBadge } from "./transaction-status-badge"
import { TransactionStatusBadge } from "./transaction-type-badge"
import { Pagination } from "./TestPagination"
import { Transaction } from "@/types/transaction"

type PaymentType = "slot_booking" | "cancel_appointment" | "subscription" | "refund"; 
export interface TransactionQueryParams {
    page?: number
  limit?: number
  search?: string
  type?: string
  status?: string
  paymentType?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export default function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  }>({
    key: "createdAt",
    direction: "desc",
  })

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  console.log(selectedTransaction)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryParams: TransactionQueryParams = {
    page: currentPage,
    limit: pageSize,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
  }
  if (searchTerm) queryParams.search = searchTerm
  if (typeFilter !== "all") queryParams.type = typeFilter
  if (statusFilter !== "all") queryParams.status = statusFilter
  if (paymentTypeFilter !== "all") queryParams.paymentType = paymentTypeFilter;

  const { data, isLoading, isFetching, error } = useGetTransactionsQuery(queryParams);
 console.log(data)
  const transactions = data?.transactions || []
  const totalPages = data?.totalPages || 1
  const totalItems = data?.total || 0

  const uniquePaymentTypes: PaymentType[] = Array.from(
    new Set(transactions.map((transaction: Transaction) => transaction.paymentType))
  );

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="w-full bg-zinc-900 text-white border-gray-800">
        <CardHeader className="pb-2 border-b border-gray-800">
          <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">

            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">

              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  setTypeFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Type</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-indigo-300">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>

   
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-indigo-300">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>


              <Select
                value={paymentTypeFilter}
                onValueChange={(value) => {
                  setPaymentTypeFilter(value)
                  setCurrentPage(1) 
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700 text-white">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Payment Type</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-indigo-300">
                  <SelectItem value="all">All Payment Types</SelectItem>
                  {uniquePaymentTypes.map((type) => (
                    <SelectItem key={type as string} value={type as string}>
                      {type.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800 overflow-hidden bg-gray-900">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-400">Loading transactions...</div>
              ) : error ? (
                <div className="p-8 text-center text-red-400">Error loading transactions. Please try again.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("createdAt")}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Date
                          {sortConfig.key === "createdAt" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center">From/To</div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("type")}>
                          Type
                          {sortConfig.key === "type" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("paymentType")}>
                          Payment Type
                          {sortConfig.key === "paymentType" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("amount")}>
                          Amount
                          {sortConfig.key === "amount" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => requestSort("status")}>
                          Payment Status
                          {sortConfig.key === "status" &&
                            (sortConfig.direction === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction : Transaction) => (
                        <tr
                          key={transaction._id}
                          className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-gray-300">{formatDate(transaction.createdAt)}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                <img
                                  src={
                                    transaction.type === "debit"
                                      ? transaction.toDetails.profilePicture
                                      : transaction.fromDetails.profilePicture
                                  }
                                  alt="Profile"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="truncate max-w-[120px]">
                                {transaction.type === "debit"
                                  ? transaction.toDetails.name
                                  : transaction.fromDetails.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <TransactionTypeBadge type={transaction.type} />
                          </td>
                          <td className="px-4 py-3 text-sm capitalize text-gray-300">
                            {transaction.paymentType.replace(/_/g, " ")}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
  <span
    className={
      transaction.type === "credit"
        ? "text-indigo-600"
        : transaction.type === "failed"
        ? "text-gray-400 italic"
        : "text-red-600"
    }
  >
    {transaction.type !== "failed" && (transaction.type === "credit" ? "+" : "-")}
    {transaction.currency} {transaction.amount.toLocaleString()}
  </span>
</td>

                          <td className="px-4 py-3">
                            <TransactionStatusBadge status={transaction.status} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(transaction)}
                              className="text-indigo-400 hover:text-indigo-300 hover:bg-gray-700"
                            >
                              <Info className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                          No transactions found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 sm:mb-0">
              Showing {transactions.length} of {totalItems} transactions
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isLoading={isFetching}
            />
          </div>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </>
  )
}

