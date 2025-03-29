import { useState, useMemo } from "react"
import { Search, ArrowDown, ArrowUp, Calendar, CreditCard, Wallet, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"


interface Transaction {
  _id: string
  from: string
  fromModel: string
  to: string
  toModel: string
  amount: number
  type: "credit" | "debit"
  method: string
  paymentType: string
  status: string
  currency: string
  bookingId: string
  transactionId: string
  createdAt: string
  updatedAt: string
  __v: number
  relatedTransactionId?: string
}

interface TransactionTableProps {
  data: {
    success: boolean
    message: string
    transactions: Transaction[]
  }
}

export default function TransactionTable({ data }: TransactionTableProps) {
  // Default props for development/testing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transactions = data?.transactions || []

  // State for search, filters, and sorting
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null
    direction: "ascending" | "descending"
  }>({
    key: "createdAt",
    direction: "descending",
  })

  const uniquePaymentTypes = useMemo(() => {
    const types = new Set<string>()
    transactions.forEach((transaction) => {
      types.add(transaction.paymentType)
    })
    return Array.from(types)
  }, [transactions])


  const filteredAndSortedTransactions = useMemo(() => {

    const filtered = transactions.filter((transaction) => {

      const searchMatch =
        searchTerm === "" ||
        transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)


      const typeMatch = typeFilter === "all" || transaction.type === typeFilter


      const statusMatch = statusFilter === "all" || transaction.status === statusFilter

      const paymentTypeMatch = paymentTypeFilter === "all" || transaction.paymentType === paymentTypeFilter

      return searchMatch && typeMatch && statusMatch && paymentTypeMatch
    })


    if (sortConfig.key !== null) {
      const key = sortConfig.key as keyof Transaction;

      filtered.sort((a, b) => {
        const valueA = a[key] as string | number;
        const valueB = b[key] as string | number;

        if (valueA < valueB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }



    return filtered
  }, [transactions, searchTerm, typeFilter, statusFilter, paymentTypeFilter, sortConfig])

  // Handle sort click
  const requestSort = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Format date for display
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



  return (
    <Card className="w-full bg-black text-white border-gray-800">
      <CardHeader className="pb-2 border-b border-gray-800">
        <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[130px] bg-gray-900 border-gray-700 text-white">
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Type Filter */}
            <Select value={paymentTypeFilter} onValueChange={setPaymentTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700 text-white">
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Payment Type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Types</SelectItem>
                {uniquePaymentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace("_", " ")}
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
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("createdAt")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Date
                      {sortConfig.key === "createdAt" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("transactionId")}>
                      ID
                      {sortConfig.key === "transactionId" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("type")}>
                      Type
                      {sortConfig.key === "type" &&
                        (sortConfig.direction === "ascending" ? (
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
                        (sortConfig.direction === "ascending" ? (
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
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("status")}>
                      Status
                      {sortConfig.key === "status" &&
                        (sortConfig.direction === "ascending" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransactions.length > 0 ? (
                  filteredAndSortedTransactions.map((transaction) => (
                    <tr key={transaction._id} className="border-t border-gray-800 hover:bg-gray-800 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-300">{formatDate(transaction.createdAt)}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-300">
                        {transaction.transactionId.substring(0, 8)}...
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={transaction.type === "credit" ? "default" : "secondary"}
                          className={`${transaction.type === "credit"
                            ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                            : "bg-red-400  text-black hover:bg-black hover:bg-opacity-10"
                            }`}
                        >
                          {transaction.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize text-gray-300">
                        {transaction.paymentType.replace(/_/g, " ")}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <span className={transaction.type === "credit" ? "text-indigo-600" : "text-red-600"}>
                          {transaction.type === "credit" ? "+" : "-"}
                          {transaction.currency} {transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={transaction.status === "success" ? "outline" : "destructive"}
                          className={`${transaction.status === "success"
                            ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-indigo-200"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                            }`}
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No transactions found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredAndSortedTransactions.length} of {transactions.length} transactions
        </div>
      </CardContent>
    </Card>
  )
}

