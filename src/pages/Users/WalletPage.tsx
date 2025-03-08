import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetWalletQuery } from "../../redux/api/appApi";
import { selectCurrentUser } from "../../redux/slice/Auth_Slice";
import WalletSkeleton from "@/components/skeleton/WalletSkeleton";
import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface Transaction {
  _id: string;
  description: string;
  createdAt: Date;
  amount: number;
}
const ITEMS_PER_PAGE = 5;

export default function WalletPage() {
  const user = useSelector(selectCurrentUser);
  const { data: walletData, error, isLoading } = useGetWalletQuery({ userId: user?._id });

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <WalletSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-red-500">
          <p>Failed to fetch wallet details.</p>
        </div>
      </div>
    );
  }

  const balance = walletData?.response.balance || 0;
  const transactions = walletData?.response.transactions || [];
  const pageCount = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = transactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <Navigation />
      <div className="max-w-3xl mt-10 mx-auto">
        <div className="bg-zinc-800 shadow-xl lg:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6 bg-purple-600 text-white">
            <h3 className="text-lg leading-6 font-medium">Your Wallet</h3>
            <div className="mt-2 text-3xl font-bold">
              {walletData?.response.currency} {balance.toFixed(2)}
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">Transaction History</h3>
            <div className="space-y-4">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction: Transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between bg-zinc-700 p-4 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">{transaction.description}</p>
                      <p className="text-xs text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div
                      className={`text-sm font-semibold ${transaction.amount >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {transaction.amount >= 0 ? "+" : "-"}
                      {walletData?.response.currency} {Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No transactions found.</p>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-zinc-600 bg-zinc-700 text-sm font-medium text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft />
                </button>
                <span className="px-3 py-2 border-t border-b border-zinc-600 bg-zinc-700 text-sm font-medium text-white">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  onClick={() => setCurrentPage((page) => Math.min(page + 1, pageCount))}
                  disabled={currentPage === pageCount}
                  className="px-3 py-2 rounded-r-md border border-zinc-600 bg-zinc-700 text-sm font-medium text-white hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
