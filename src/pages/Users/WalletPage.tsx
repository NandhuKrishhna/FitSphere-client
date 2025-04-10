import React from "react"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useGetWalletQuery } from "../../redux/api/appApi"
import { selectCurrentUser } from "../../redux/slice/Auth_Slice"
import WalletSkeleton from "@/components/skeleton/WalletSkeleton"
import Header from "@/components/App/Header"
import Navigation from "@/components/App/Navigation"
import { WalletTransactionQuery } from "@/types/wallet.types"
import TransactionFilters from "@/components/App/TransactionFilter"
import { WalletHeader } from "@/components/App/WalletHeader"
import TransactionList from "@/components/App/TransactionList"
import Pagination from "@/components/App/TP"
import { Roles } from "@/utils/Enums"

interface Transaction {
  _id: string
  description: string
  createdAt: string
  amount: number
  type: string
  status: string
  currency: string
}

const ITEMS_PER_PAGE = 2

export default function WalletPage() {
  const userId = useSelector(selectCurrentUser)?._id?.toString()
  const role = useSelector(selectCurrentUser)?.role?.toString()
  const [queryParams, setQueryParams] = useState<WalletTransactionQuery>({
    page: 1,
    limit: ITEMS_PER_PAGE,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: "asc" | "desc"
  }>({
    key: "createdAt",
    direction: "desc",
  })

  const { data, error, isLoading } = useGetWalletQuery({
    userId,
    role,
    ...queryParams,
  })

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      search: searchQuery || undefined,
      status: filterStatus || undefined,
      sortBy: sortConfig.key || undefined,
      sortOrder: sortConfig.direction || undefined,
    }))
  }, [searchQuery, filterStatus, sortConfig])



  if (error) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-red-500">
          <p>Failed to fetch wallet details.</p>
        </div>
      </div>
    )
  }

  const walletData = data?.response
  const balance = walletData?.wallet?.balance || 0
  const currency = walletData?.wallet?.currency || "INR"
  const transactions: Transaction[] = walletData?.transactions || []

  const totalTransactions = walletData?.total || transactions.length
  const totalPages = walletData?.totalPages || Math.ceil(totalTransactions / ITEMS_PER_PAGE)
  const currentPage = Number(queryParams.page || 1)

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }))
  }

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFilterStatus(null)
    setSortConfig({
      key: "createdAt",
      direction: "desc",
    })
    setQueryParams({
      page: 1,
      limit: ITEMS_PER_PAGE,
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
    }))
  }

  return (
    <div className="min-h-screen pb-10 bg-[#121212] text-white">
      {role === Roles.USER && (
        <>
          <Header />
          <Navigation />
        </>
      )}

      <div className="max-w-3xl mt-10 mx-auto px-4">
        <div className="bg-zinc-800 shadow-xl lg:rounded-lg overflow-hidden">
          {isLoading ? (
            <WalletSkeleton />
          ) : (
            <>
              <WalletHeader balance={balance} currency={currency} />

              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-lg leading-6 font-medium text-white">Transaction History</h3>

                  <TransactionFilters
                    searchQuery={searchQuery}
                    filterStatus={filterStatus}
                    sortConfig={sortConfig}
                    onSearchChange={handleSearchChange}
                    onFilterChange={setFilterStatus}
                    onSortChange={handleSort}
                    onClearFilters={clearFilters}
                    setQueryParams={setQueryParams}
                  />
                </div>

                <TransactionList
                  transactions={transactions}
                  searchQuery={searchQuery}
                  filterStatus={filterStatus}
                  currency={currency}
                  clearFilters={clearFilters}
                />

                {totalTransactions > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalTransactions}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )

}